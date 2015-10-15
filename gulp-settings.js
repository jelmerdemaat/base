var self = this;

self.src = 'src/';
self.dest = 'dist/';

self.html = {
  	src: self.src + '*.html',
  	dest: self.dest
};

self.scss = {
  	src: self.src + 'scss/**/*.scss',
  	dest: self.dest + 'css/',
    folder: self.src + 'scss/'
};

self.js = {
  src: self.src + 'js/**/*.js',
  dest: self.dest + 'js/'
};

self.sprite = {
  src: self.src + 'sprite/*.{png,jpg,gif}',
  dest: self.dest + 'sprite/',
  name: 'sprite',
  style: self.scss.folder + 'sprite.scss'
};

module.exports = self;
