export interface TreeModel {
    name: string; // name of item
    id: number; // id of item
    options?: TreeItemOptions; // options of item
    childrens: TreeModel[]; // childrens list
}
export interface TreeItemOptions {
    // item options
    href?: string;
    hidden?: boolean;
    hideChildrens?: boolean;
    draggable?: boolean;
    position?: number;
    edit?: boolean;
    disabled?: boolean;
    // item buttons
    showDropChildZone?: boolean;
    showActionButtons?: boolean;
    showDeleteButton?: boolean;
    showExpandButton?: boolean;
}