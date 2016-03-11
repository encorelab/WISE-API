'use strict';

class NodeController {

    constructor($anchorScroll,
                $location,
                $scope,
                $state,
                $stateParams,
                $timeout,
                ProjectService,
                ConfigService) {
        this.$anchorScroll = $anchorScroll;
        this.$location = $location;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.ProjectService = ProjectService;
        this.ConfigService = ConfigService;
        this.projectId = $stateParams.projectId;
        this.nodeId = $stateParams.nodeId;
        this.showCreateComponent = false;
        this.selectedComponent = null;

        // the array of component types that can be created
        this.componentTypes = [
            {componentType: 'Discussion', componentName: 'Discussion'},
            {componentType: 'Draw', componentName: 'Draw'},
            {componentType: 'Embedded', componentName: 'Embedded'},
            {componentType: 'Graph', componentName: 'Graph'},
            {componentType: 'HTML', componentName: 'HTML'},
            {componentType: 'Label', componentName: 'Label'},
            {componentType: 'Match', componentName: 'Match'},
            {componentType: 'MultipleChoice', componentName: 'Multiple Choice'},
            {componentType: 'OpenResponse', componentName: 'Open Response'},
            {componentType: 'OutsideURL', componentName: 'Outside URL'},
            {componentType: 'Table', componentName: 'Table'}
        ];

        // set the drop down to the first item
        this.selectedComponent = this.componentTypes[0].componentType;

        // get the node
        this.node = this.ProjectService.getNodeById(this.nodeId);

        // get the components in the node
        this.components = this.ProjectService.getComponentsByNodeId(this.nodeId);
    }

    /**
     * Launch VLE with this current step as the initial step
     */
    previewStep() {
        let previewProjectURL = this.ConfigService.getConfigParam("previewProjectURL");
        let previewStepURL  = previewProjectURL + "#/vle/" + this.nodeId;
        window.open(previewStepURL);
    };

    close() {
        this.$state.go('root.project', {projectId: this.projectId});
    };

    /**
     * Create a component in this node
     */
    createComponent() {

        // create a component and add it to this node
        this.ProjectService.createComponent(this.nodeId, this.selectedComponent);

        // save the project
        this.ProjectService.saveProject();

        // hide the create component elements
        this.showCreateComponent = false;

        // Scroll to the bottom of the page where the new component was added
        this.$timeout(() => {
            this.$location.hash('bottom');
            this.$anchorScroll();
        });
    }

    /**
     * Move a component up within this node
     * @param componentId the component id
     */
    moveComponentUp(componentId) {

        // move the component up within the node
        this.ProjectService.moveComponentUp(this.nodeId, componentId);

        // save the project
        this.ProjectService.saveProject();
    }

    /**
     * Move a component up within this node
     * @param componentId the component id
     */
    moveComponentDown(componentId) {

        // move the component down within the node
        this.ProjectService.moveComponentDown(this.nodeId, componentId);

        // save the project
        this.ProjectService.saveProject();
    }

    /**
     * Delete the component from this node
     * @param componentId the component id
     */
    deleteComponent(componentId) {
    
        // ask the user to confirm the delete
        var answer = confirm('Are you sure you want to delete this component?');
        
        if (answer) {
            // the user confirmed yes
            
            // delete the component from the node
            this.ProjectService.deleteComponent(this.nodeId, componentId);

            // save the project
            this.ProjectService.saveProject();
        }
    }

    /**
     * The node has changed in the authoring view
     */
    authoringViewNodeChanged() {
        this.ProjectService.saveProject();
    }
};

NodeController.$inject = ['$anchorScroll', '$location', '$scope', '$state', '$stateParams', '$timeout', 'ProjectService', 'ConfigService'];

export default NodeController;
