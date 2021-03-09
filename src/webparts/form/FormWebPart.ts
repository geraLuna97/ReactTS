import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FormWebPartStrings';
import Form from './components/Form';
import { IFormProps } from './components/IFormProps';
import { FormProvider } from '../../providers/FormProvider';

export interface IFormWebPartProps {
  description: string;
}

export default class FormWebPart extends BaseClientSideWebPart<IFormWebPartProps> {

  public onInit(): Promise<void> {
    FormProvider.setup(this.context);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IFormProps> = React.createElement(
      Form,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }



  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
