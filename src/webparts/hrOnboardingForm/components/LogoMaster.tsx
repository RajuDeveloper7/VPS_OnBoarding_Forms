import * as React from "react";
import { ILogoMasterProps } from "./IHrOnboardingFormProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
import { Spinner } from "office-ui-fabric-react";

export interface ILogoMasterState {
    SiteLogo: string;
    IsLogoLoaded: boolean;
}
const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM");

export default class LogoMaster extends React.Component<ILogoMasterProps, ILogoMasterState, {}> {

    constructor(props: ILogoMasterProps, state: ILogoMasterState) {
        super(props);
        this.state = {
            SiteLogo: "",
            IsLogoLoaded: false,
        };
    }

    public componentDidMount() {
        const url: any = new URL(window.location.href);
        var GlobalSessionIDValue = url.searchParams.get("glblsessid");

        newweb.lists.getByTitle("Personal Information Master").items.select("UnitLogo").filter("ONBSessionID eq '" + GlobalSessionIDValue + "'").get().then((resp) => {
            if (resp.length != 0) {
                this.setState({
                    SiteLogo: resp[0].UnitLogo,
                    IsLogoLoaded: true
                });
            }
        })
    }

    public render(): React.ReactElement<ILogoMasterProps> {        
        return (
            <div>
                {this.state.IsLogoLoaded == true ?
                    <img
                        id="imgpersonalitemid"
                        className="itemidimgpersonal"
                        style={{ height: "50px" }}
                        src={`${this.state.SiteLogo}`}
                        alt="error"
                    ></img>
                    :
                    <></>
                }
            </div>
        );
    }
}