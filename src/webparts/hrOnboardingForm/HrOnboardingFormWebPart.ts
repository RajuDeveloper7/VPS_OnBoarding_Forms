import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as $  from "jquery";
import * as strings from 'HrOnboardingFormWebPartStrings';
import HrOnboardingForm from './components/HrOnboardingForm';
import { IHrOnboardingFormProps } from './components/IHrOnboardingFormProps';
export interface IHrOnboardingFormWebPartProps {
  description: string;

}

export default class HrOnboardingFormWebPart extends BaseClientSideWebPart<IHrOnboardingFormWebPartProps> {

  public render(): void {
    //$("html").css("visibility","hidden");
    const element: React.ReactElement<IHrOnboardingFormProps> = React.createElement(
      HrOnboardingForm,
      {
        description: this.properties.description,
        siteurl:this.context.pageContext.web.absoluteUrl,
        UserId: this.context.pageContext.legacyPageContext["userId"],
        context:this.context
       
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
