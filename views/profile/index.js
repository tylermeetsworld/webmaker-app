var view = require('../../lib/view');
var clone = require('clone');

module.exports = view.extend({
    id: 'profile',
    template: require('./index.html'),
    data: {
        title: 'My Profile'
    },
    methods: {
      clean: function (e) {
        var sh = this.model._fs.Shell();
        var fs = this.model._fs;
        var sync = fs.sync;
          fs.stat('/', function(e, stat) {
          if (!stat.isDirectory()) {
            fs.unlink('/', function(e) {
              sync.request();
            });
          } else {
            sh.rm('/', {
              recursive: true
            }, function(e) {
              console.log(e);
              sync.request();
            });
          }
        });
      }
    },
    created: function () {
        var user = clone(this.model.user);
        this.$data = this.model.user;

        // Default to editing mode if the user have not filled out their profile
        // if (this.$data.name || this.$data.location) {
        //     this.$data.editing = false;
        // } else {
        //     this.$data.editing = true;
        // }

        this.$data.myApps = clone(this.model.apps);

        // this.$data.cancel = function () {
        //     this.$data.name = user.name;
        //     this.$data.location = user.location;
        //     this.$data.editing = false;
        // };

        // this.$data.save = function () {
        //     this.$data.editing = false;
        //     this.model.user.name = this.$data.name;
        //     this.model.user.location = this.$data.location;
        //     this.model.user.avatar = this.$data.avatar;
        //     this.model.save();
        //     this.$data.myApps = clone(this.model.apps);
        // };
    },
    detached: function () {
        // this.model.user.name = this.$data.name;
        // this.model.user.location = this.$data.location;
        // this.model.user.avatar = this.$data.avatar;
    }
});
