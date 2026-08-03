# Jekyll on Fedora: Ruby ABI and Version Compatibility Fix

This document records a Jekyll failure encountered on Fedora after the system Ruby installation was upgraded.

## Problem summary

Running Jekyll produced a sequence of errors involving native Ruby extensions and later pure-Ruby compatibility problems.

Examples included:

```text
libruby.so.3.1: cannot open shared object file
```

```text
Unable to load the EventMachine C extension
```

```text
undefined method `[]` for nil
```

```text
undefined method `tainted?` for an instance of String
```

The active environment eventually showed:

```text
Ruby:   4.0.6
Jekyll: 3.9.0
Liquid: 4.0.3
```

Bundler then reported that `github-pages ~> 232` could not be installed because one of its dependencies required Ruby `< 4.0`.

## Root cause

There were two related problems.

### 1. Stale native extensions

Some native gems had been compiled against Ruby 3.1:

```text
eventmachine
http_parser.rb
```

Their compiled `.so` files still expected:

```text
libruby.so.3.1
```

However, Fedora was running Ruby 4.0.6.

Native Ruby extensions are tied to a specific Ruby ABI. A binary compiled for Ruby 3.1 cannot safely be loaded by Ruby 4.0.

### 2. Jekyll/GitHub Pages did not support Ruby 4.0

The website used an older GitHub Pages stack:

```text
Jekyll 3.9.0
Liquid 4.0.3
```

This stack contained code that depended on Ruby APIs removed in Ruby 4.0, including:

```ruby
obj.tainted?
```

Updating only `logger`, `eventmachine`, or `http_parser.rb` did not solve the full compatibility problem.

The dependency resolver ultimately confirmed the real constraint:

```text
github-pages >= 232 requires Ruby >= 2.6, < 4.0
```

Therefore, the correct solution is to run this project under Ruby 3.3.x rather than Fedora's system Ruby 4.0.x.

---

## Recommended solution

Use `rbenv` to install Ruby 3.3.4 and select it only inside the Jekyll repository.

This avoids downgrading Fedora's system Ruby.

## 1. Install build dependencies

The Git LFS Packagecloud repository caused certificate errors during DNF operations, so it was disabled temporarily:

```bash
sudo dnf --disable-repo='github_git-lfs*' install \
    git \
    gcc \
    gcc-c++ \
    make \
    openssl-devel \
    readline-devel \
    libyaml-devel \
    zlib-devel \
    libffi-devel \
    gdbm-devel \
    ncurses-devel
```

Install `rbenv` if it is not already installed:

```bash
sudo dnf --disable-repo='github_git-lfs*' install rbenv
```

## 2. Install the ruby-build plugin

The command `rbenv install` is supplied by `ruby-build`.

```bash
mkdir -p "$(rbenv root)/plugins"

git clone https://github.com/rbenv/ruby-build.git \
    "$(rbenv root)/plugins/ruby-build"
```

If the plugin already exists:

```bash
git -C "$(rbenv root)/plugins/ruby-build" pull
```

Verify that Ruby 3.3.4 is available:

```bash
rbenv install --list | grep 3.3
```

## 3. Install Ruby 3.3.4

```bash
rbenv install 3.3.4
```

Check the installed versions:

```bash
rbenv versions
```

Expected output should include:

```text
system
3.3.4
```

## 4. Select Ruby 3.3.4 for the website

Enter the repository:

```bash
cd ~/Projects/cavelandiah.github.io
```

Set the local Ruby version:

```bash
rbenv local 3.3.4
```

This creates:

```text
.ruby-version
```

Verify it:

```bash
cat .ruby-version
```

Expected:

```text
3.3.4
```

Refresh the shims:

```bash
rbenv rehash
hash -r
```

Verify the selected Ruby:

```bash
rbenv version
ruby --version
which ruby
```

Expected results:

```text
3.3.4
ruby 3.3.4
/home/cavelandiah/.rbenv/shims/ruby
```

Important: `rbenv rehash` does not select a Ruby version. If `rbenv version` still reports `system`, run:

```bash
rbenv local 3.3.4
```

## 5. Use a compatible Gemfile

Recommended `Gemfile`:

```ruby
source "https://rubygems.org"

gem "github-pages", "~> 232", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "hawkins"
end

gem "webrick", "~> 1.8"
```

The following gems do not need to be listed explicitly unless the project directly depends on them:

```ruby
gem "eventmachine"
gem "csv"
gem "base64"
gem "bigdecimal"
```

Reasons:

- `eventmachine` is already pulled in through other dependencies.
- `csv`, `base64`, and `bigdecimal` are standard/default Ruby gems.
- Adding them manually does not solve Ruby ABI incompatibilities.

## 6. Remove gems installed under Ruby 4.0

Existing project gems were installed under Ruby 4.0 and must not be reused.

```bash
cd ~/Projects/cavelandiah.github.io

rm -rf vendor/bundle
```

Back up the old lock file:

```bash
test -f Gemfile.lock && cp Gemfile.lock Gemfile.lock.ruby4-backup
```

Remove it so Bundler can resolve a compatible dependency set:

```bash
rm -f Gemfile.lock
```

## 7. Install Bundler and project dependencies

First verify Ruby again:

```bash
ruby --version
```

It must report Ruby 3.3.4 before continuing.

Install Bundler:

```bash
gem install bundler
rbenv rehash
```

Configure a project-local bundle:

```bash
bundle config set --local path vendor/bundle
bundle config set --local disable_shared_gems true
```

Install dependencies:

```bash
bundle install
```

## 8. Verify the complete environment

```bash
bundle exec ruby -e '
require "jekyll"
require "liquid"

puts "Ruby:         #{RUBY_VERSION}"
puts "GitHub Pages: #{Gem.loaded_specs["github-pages"].version}"
puts "Jekyll:       #{Jekyll::VERSION}"
puts "Liquid:       #{Liquid::VERSION}"
'
```

Expected versions:

```text
Ruby:         3.3.4
GitHub Pages: 232
Jekyll:       3.10.0
Liquid:       4.0.4
```

## 9. Start Jekyll

Clean previous output:

```bash
bundle exec jekyll clean
```

Start the local server:

```bash
bundle exec jekyll serve
```

For live reload:

```bash
bundle exec jekyll serve --livereload
```

Open:

```text
http://localhost:4000
```

---

## Diagnostic commands

### Show active Ruby components

```bash
ruby --version
which ruby
rbenv version
rbenv versions
gem environment
bundle --version
```

### Show selected Jekyll dependencies

```bash
bundle exec jekyll --version

bundle exec ruby -e '
require "liquid"
puts Liquid::VERSION
'
```

### Inspect the lock file

```bash
grep -A 4 '^    github-pages (' Gemfile.lock
grep -A 3 '^    jekyll (' Gemfile.lock
grep -A 2 '^    liquid (' Gemfile.lock
```

### Detect stale native extensions

```bash
ldd /usr/lib64/gems/ruby/eventmachine-*/rubyeventmachine.so \
    | grep -E 'ruby|not found'
```

```bash
ldd /usr/lib64/gems/ruby/http_parser.rb-*/ruby_http_parser.so \
    | grep -E 'ruby|not found'
```

### Determine which package owns a file

```bash
rpm -qf /usr/lib64/gems/ruby/eventmachine-1.2.7/rubyeventmachine.so
```

---

## Errors encountered and their meanings

### `libruby.so.3.1: cannot open shared object file`

A native gem was compiled against Ruby 3.1 but was being loaded under a newer Ruby.

Correct action: rebuild the gem under the active compatible Ruby or isolate the project with `rbenv`.

Do not create a symlink between different `libruby` versions.

### `Unable to load the EventMachine C extension`

The EventMachine native extension could not load because of the Ruby ABI mismatch.

The pure-Ruby EventMachine reactor is only a temporary fallback and does not fix the underlying environment.

### `Logger not initialized properly`

Jekyll 3.9.0 manually initialized its logger subclass in a way that was incompatible with newer versions of the `logger` gem.

Updating only `logger` bypassed one failure but exposed later incompatibilities.

### `undefined method tainted?`

Liquid 4.0.3 called an API removed from Ruby 4.0.

This confirmed that the older Jekyll/Liquid stack was not compatible with Ruby 4.0.

### Bundler: `github-pages requires Ruby < 4.0`

This was the definitive dependency-resolution result.

The correct action is to use Ruby 3.3.x for the project.

---

## Common mistakes

### Running only `rbenv rehash`

This does not install or select Ruby.

Use:

```bash
rbenv install 3.3.4
rbenv local 3.3.4
```

### Keeping `vendor/bundle` from another Ruby version

Native extensions inside `vendor/bundle` may have been compiled for the previous Ruby.

Remove and rebuild:

```bash
rm -rf vendor/bundle
bundle install
```

### Keeping an old `Gemfile.lock`

`bundle install` preserves versions already recorded in `Gemfile.lock`.

When intentionally changing the Ruby and GitHub Pages stack:

```bash
cp Gemfile.lock Gemfile.lock.backup
rm Gemfile.lock
bundle install
```

### Installing gems individually to fix each error

Adding gems such as `logger`, `eventmachine`, `csv`, or `base64` may move the failure to the next incompatible dependency.

Fix the Ruby/Jekyll compatibility boundary instead.

### Mixing system and project gems

Prefer:

```bash
bundle config set --local path vendor/bundle
bundle config set --local disable_shared_gems true
```

Then always run:

```bash
bundle exec jekyll serve
```

---

## Minimal recovery sequence

After Ruby 3.3.4 has been installed with `rbenv`:

```bash
cd ~/Projects/cavelandiah.github.io

rbenv local 3.3.4
rbenv rehash
hash -r

ruby --version

rm -rf vendor/bundle
cp Gemfile.lock Gemfile.lock.backup 2>/dev/null || true
rm -f Gemfile.lock

gem install bundler
rbenv rehash

bundle config set --local path vendor/bundle
bundle config set --local disable_shared_gems true

bundle install

bundle exec jekyll clean
bundle exec jekyll serve
```

## Final lesson

The original errors appeared to involve separate gems, but they all originated from the same environmental problem:

```text
Old Jekyll/GitHub Pages dependencies
+
native extensions compiled for an older Ruby
+
Fedora system Ruby 4.0
=
incompatible runtime
```

The stable solution is a project-local Ruby 3.3.x environment managed by `rbenv`.
