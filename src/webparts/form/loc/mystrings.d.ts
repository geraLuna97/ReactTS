declare interface IFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'FormWebPartStrings' {
  const strings: IFormWebPartStrings;
  export = strings;
}
