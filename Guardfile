guard :shell do
  watch(%r{functional/.*js}) { |m| `docco functional/*.js` }
end

guard 'livereload' do
  watch(%r{docs/.*html})
end
