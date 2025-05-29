/*
    Parliament Vote specific configuration variables.

    You should not need to edit anything in the section below 
    unless you are adding new features with disabled imports.
*/
export const FETCH_WORKFLOW = "";
export const  EDIT_WORKFLOW = "";

/*
    This is a config file for the Bolt template. As of version v1, this only supports toggling what interactions are imported or not.
*/

export const interactionImports = {
    // Actions, such as button presses. Slack refers to this as "Interactivity".
    actions: true,

    // Slash commands.
    commands: true,

    // Events via Event Subscriptions.
    events: false,

    // Slack functions are custom workflow steps.
    functions: true,

    // Actions that you can invoke globally or on a message.
    shortcuts: false,

    // Submission of modals and app home views.
    views: true
};
