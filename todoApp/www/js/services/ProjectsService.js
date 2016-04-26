	angular
		.module('todoApp')
		.factory('Projects', Projects);

	Projects.$inject = ['$localstorage'];
	function Projects($localstorage) {
		var service = {
			all: all,
			save: save,
			newProject: newProject,
			getLastActiveIndex: getLastActiveIndex,
			setLastActiveIndex: setLastActiveIndex,
			deleteProject: deleteProject
		};
		
		var globalProjects = [];
		
		return service;

		////////////////
		function all() {
			console.log("Projects.all");
			// var projectString = window.localStorage['projects'];
      var projectString = $localstorage.getObject('projects');
			// if (projectString) {
			// 	globalProjects = angular.fromJson(projectString); 				
			// }
			return globalProjects;
		}
		
		function deleteProject(project) {
			console.log("Projects.deleteProject");
			console.log(globalProjects);
			console.log(project);
			var index = globalProjects.indexOf(project);
			globalProjects.splice(index, 1);
			save(globalProjects);
			
			var currentIndex = getLastActiveIndex();

			if (index == currentIndex && currentIndex == globalProjects.length){
				setLastActiveIndex(index - 1);	
			}
			else if (index < currentIndex)
			{
				setLastActiveIndex(currentIndex - 1);
			}
			else {
				setLastActiveIndex(index);	
			}
		}


		function save(projects) {
			console.log("Projects.save");
      // window.localStorage['projects'] = angular.toJson(projects);
      $localstorage.setObject('projects', projects);
		}

		function newProject(projectTitle) {
			console.log("Projects.newProject");
			// Add a new project
			return {
				title: projectTitle,
				tasks: []
			};
		}
		
		function getLastActiveIndex() {
			console.log("Projects.getLastActiveIndex");
			// return parseInt(window.localStorage['lastActiveProject']) || 0;
      return parseInt($localstorage.get('lastActiveProject'))
		}
		
		function setLastActiveIndex(index) {
			console.log("Projects.setLastActiveIndex");
			// window.localStorage['lastActiveProject'] = index;
      $localstorage.set('lastActiveProject', index);
		}
		
	}