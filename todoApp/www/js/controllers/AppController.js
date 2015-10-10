	angular
		.module('todoApp')
		.controller('AppController', AppController);
			
	AppController.$inject = ['$scope', '$ionicModal', '$ionicSideMenuDelegate', 'Projects'];
	function AppController($scope, $ionicModal, $ionicSideMenuDelegate, Projects) {
		// Load or initialize projects
		$scope.projects = Projects.all();
		
		$ionicModal.fromTemplateUrl('templates/new-project.html', function(modal) {
			$scope.projectModal = modal;
			}, {
				scope: $scope
			});
			
		$scope.showProjectModal = function () {
			$scope.projectModal.show();
		}
		
		$scope.closeNewProject = function () {
			$scope.projectModal.hide();
		}
		
		$scope.newProject = function (project) {
			var projectTitle = project.title;
			if (projectTitle) {
				var newProject = Projects.newProject(projectTitle);
				$scope.projects.push(newProject);
				Projects.save($scope.projects);
				$scope.closeNewProject();
				$ionicSideMenuDelegate.toggleLeft();
				project.title = '';
				
				$scope.activeProject = newProject;
				Projects.setLastActiveIndex($scope.projects.length);
			}
		}
		
		$scope.selectProject = function (project, index) {
			console.log('AppController.selectProject');
			console.log(project);
			console.log(index);
			$scope.activeProject = project;
			Projects.setLastActiveIndex(index);
			$ionicSideMenuDelegate.toggleLeft();
		}
	}