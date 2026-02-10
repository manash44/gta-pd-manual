var app = angular.module('gtaPdManual', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/10-codes.html"
        })
        .when("/10-codes", {
            templateUrl: "pages/10-codes.html"
        })
        .when("/penal-codes", {
            templateUrl: "pages/penal-codes.html"
        })
        .when("/amendments", {
            templateUrl: "pages/amendments.html"
        })
        .when("/miranda", {
            templateUrl: "pages/miranda.html"
        })
        .when("/sop", {
            templateUrl: "pages/sop.html",
            controller: "SOPController"
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller('MainController', function ($scope, $location, $timeout, $document) {
    // Initial State
    $scope.isBookOpen = false;
    $scope.searchQuery = '';

    // Navigation highlighting
    $scope.isActive = function (viewLocation) {
        var path = $location.path();
        if ((path === '/' || path === '') && viewLocation === '/10-codes') return true;
        return path === viewLocation;
    };

    // Book Controls
    $scope.openBook = function () {
        console.log('Opening book...');
        $timeout(function () {
            $scope.isBookOpen = true;
        });
    };

    $scope.closeBook = function () {
        $timeout(function () {
            $scope.isBookOpen = false;
        });
    };

    // Helper for scrolling
    function scrollContent(amount) {
        var content = document.querySelector('.main-content');
        if (content) {
            content.scrollTop += amount;
        }
    }

    // Numpad Control System
    $document.on('keydown', function (event) {
        // Log key for debugging if needed
        // console.log(event.code);

        // Numpad Enter or Numpad Multiply (*) to Toggle Book
        if (event.code === 'NumpadEnter' || event.code === 'NumpadMultiply') {
            event.preventDefault();
            $timeout(function () {
                $scope.isBookOpen = !$scope.isBookOpen;
            });
            return;
        }

        // Only process other keys if book is open
        if (!$scope.isBookOpen) return;

        // Navigation Map
        var navMap = {
            'Numpad7': '/10-codes',
            'Numpad9': '/penal-codes',
            'Numpad1': '/amendments',
            'Numpad3': '/miranda',
            'Numpad5': '/sop'
        };

        if (navMap[event.code]) {
            event.preventDefault();
            $timeout(function () {
                $location.path(navMap[event.code]);
            });
            return;
        }

        // Scrolling
        if (event.code === 'Numpad8') { // Up
            event.preventDefault();
            scrollContent(-150); // Scroll Up
        }
        if (event.code === 'Numpad2') { // Down
            event.preventDefault();
            scrollContent(150); // Scroll Down
        }

        // Page Cycling (4 and 6)
        var pages = ['/10-codes', '/penal-codes', '/amendments', '/miranda', '/sop'];
        if (event.code === 'Numpad4' || event.code === 'Numpad6') {
            event.preventDefault();
            var currentPath = $location.path();
            if (currentPath === '/') currentPath = '/10-codes';

            var index = pages.indexOf(currentPath);
            // If not found, default to 0
            if (index === -1) index = 0;

            var newIndex;
            if (event.code === 'Numpad6') { // Next
                newIndex = (index + 1) % pages.length;
            } else { // Prev
                newIndex = (index - 1 + pages.length) % pages.length;
            }

            $timeout(function () {
                $location.path(pages[newIndex]);
            });
        }
    });

    // Clean up
    $scope.$on('$destroy', function () {
        $document.off('keydown');
    });

    // Search Functionality
    $scope.handleSearch = function () {
        var query = ($scope.searchQuery || '').toLowerCase().trim();

        // Use timeout to ensure DOM update (if needed) but here we filter existing DOM
        $timeout(function () {
            // Select all searchable items across all pages (though only current page is in dom)
            // We need to be specific to avoid hiding structural elements
            var searchableElements = document.querySelectorAll('.code-card, .penal-table tbody tr, .amendment-card, .sop-card, .miranda-right-card, .requirement-card, .clarification-item, .sop-section');

            angular.forEach(searchableElements, function (element) {
                var text = element.textContent.toLowerCase();
                if (!query || text.includes(query)) {
                    element.style.display = '';
                    if (query) {
                        element.style.animation = 'highlight 0.5s ease';
                        // Remove animation after
                        $timeout(function () { element.style.animation = ''; }, 500);
                    }
                } else {
                    element.style.display = 'none';
                }
            });
        }, 0);
    };

    // Listen for route changes to clear search
    $scope.$on('$viewContentLoaded', function () {
        $scope.searchQuery = ''; // Clear search on page change
        // Ensure book interface stays open if navigated via URL directly? Default is good.
    });
});

app.controller('SOPController', ['$scope', '$timeout', function ($scope, $timeout) {
    // Default section
    if (!$scope.activeSection) $scope.activeSection = 'intro';

    $scope.setSection = function (section) {
        $scope.activeSection = section;
        // Scroll main content to top
        $timeout(function () {
            var mainContent = document.querySelector('.sop-main');
            if (mainContent) mainContent.scrollTop = 0;
        });
    };

    $scope.isActive = function (section) {
        return $scope.activeSection === section;
    };
}]);
