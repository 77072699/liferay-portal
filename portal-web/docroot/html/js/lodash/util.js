;(function(_) {
	var REGEX_SUB = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g;

	_.mixin(
		{
			bindRight: function(fn, context) {
				var args = _.toArray(arguments).slice(2);

				args.unshift(_.bind(fn, context));

				return _.partialRight.apply(_, args);
			},

			bindKeyRight: function(context, key) {
				var args = _.toArray(arguments).slice(2);

				args.unshift(_.bindKey(context, key));

				return _.partialRight.apply(_, args);
			},

			sub: function(string, data) {
				if (arguments.length > 2 || !_.isObject(data)) {
					data = _.toArray(arguments).slice(1);
				}

				return string.replace ? string.replace(
					REGEX_SUB,
					function (match, key) {
						return _.isUndefined(data[key]) ? match : data[key];
					}
				) : string;
			}
		}
	);

	_.mixin(
		{
			namespace: function(obj, path) {
				if (arguments.length === 1) {
					path = obj;
					obj = this;
				}

				if (_.isString(path)) {
					path = path.split('.');
				}

				for (var i = 0; i < path.length; i++) {
					var name = path[i];

					obj[name] = obj[name] || {};
					obj = obj[name];
				}

				return obj;
			}
		},
		{
			chain: false
		}
	);
})(AUI._);