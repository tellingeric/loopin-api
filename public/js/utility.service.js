angular.module('LoopIn-Web.utility', ['ngToast','LoopIn-Web.constant']);

angular.module('LoopIn-Web.utility')

    .service('UtilityService', function (ngToast,uiSettings,$timeout) {

        var showToast = function (type, msg) {
            $timeout(function () {
                ngToast.create({
                    className: type,
                    content: msg,
                    dismissOnTimeout: true,
                    dismissButton: true,
                    dismissOnClick: true
                });
            }, uiSettings.toastDelay);
        };

        return {

            showToast: showToast,

            safelyParseJson: function (json) {
                // This function cannot be optimised, it's best to
                // keep it small!
                var parsed;

                try {
                    parsed = JSON.parse(json)
                } catch (e) {
                    // Oh well, but whatever...
                    showToast('warning', 'JSON Parse Error:' + json + '\n' + e);

                }

                return parsed; // Could be undefined!

            }


        }

    });
