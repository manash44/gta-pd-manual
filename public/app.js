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

app.controller('MainController', function ($scope, $location, $timeout) {
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
        $scope.isBookOpen = false;
        // Optionally reset route? No, keep it as is.
    };

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
