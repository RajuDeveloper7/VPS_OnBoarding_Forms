import * as React from 'react';
import styles from './Headerpart.module.scss';
import { IHeaderpartProps } from './IHeaderpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader"
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";


SPComponentLoader.loadCss(
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
);


SPComponentLoader.loadCss(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=3.8"
);
export interface IHrHeaderState {

  CurrentUserName: string,
  CurrentUserDesignation: string,
  CurrentUserProfilePic: string,
  SiteLogo: string;
}
export default class HrHeader extends React.Component<IHeaderpartProps, IHrHeaderState, {}> {

  constructor(props: IHeaderpartProps, state: IHrHeaderState) {
    super(props);
    this.state = {
      CurrentUserName: "",
      CurrentUserDesignation: "",
      CurrentUserProfilePic: "",
      SiteLogo: ""


    };
  }

  public componentDidMount() {
    $('.headerRow-45').hide();
    $(".spAppAndPropertyPanelContainer .sp-appBar").hide()


    this.GetCurrentUserDetails();
    this.BindPlaceholderLogo();
  }
  public GetCurrentUserDetails() {
    var reacthandler = this;
    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        var email = resultData.d.Email;
        var Name = resultData.d.DisplayName;
        var Designation = resultData.d.Title;
        reacthandler.setState({
          CurrentUserName: Name,
          CurrentUserDesignation: Designation,
          CurrentUserProfilePic: `${reacthandler.props.siteurl}/_layouts/15/userphoto.aspx?size=l&username=${email}`
        });

      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  }

  public BindPlaceholderLogo() {

    var reacthandler = this;
    $.ajax({
      url: `https://vpshealth.sharepoint.com/sites/burjeelholdings/_api/web/lists/getbytitle('Logo Master')/items?$select=Title,Logo&$filter=IsActive eq 1&$orderby=Created desc&$top=1`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        let RawImageTxt = resultData.d.results[0].Logo;
        if (RawImageTxt != "") {
          var ImgObj = JSON.parse(RawImageTxt);
          reacthandler.setState({
            SiteLogo: `${ImgObj.serverRelativeUrl}`
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  }


  public ShowUserDetailBlock() {
    $(".user-profile-details").toggleClass("open");
  }
  public CloseUserDetailsBlock() {
    $(".user-profile-details").removeClass("open");
  }

  public render(): React.ReactElement<IHeaderpartProps> {
    return (
      <div className={styles.headerpart}>

        <header className='onboarding_header'>
          <div className="dashboard_header_div clearfix">
            <div className="header-left">
              <div className="img-logo">
                <a className="logoanchor" href="https://vpshealth.sharepoint.com/sites/burjeelholdings/SitePages/homepage.aspx" data-interception="off">  <img className='imgsslogo' src={this.state.SiteLogo} alt="image" /> </a>
              </div>
            </div>
            <div className="header-right">

              <li className="user-images"> <a href="#" className="notification relative" onClick={() => this.ShowUserDetailBlock()} onMouseLeave={() => this.CloseUserDetailsBlock()}>
                <img src={`${this.state.CurrentUserProfilePic}`} alt="images" />
                <div className="user-profile-details">
                  <h3>  {this.state.CurrentUserName} </h3>
                  <p> {this.state.CurrentUserDesignation} </p>
                  <div className="logou-bck">
                    <a href="https://login.windows.net/common/oauth2/logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                  </div>
                </div>
              </a>
              </li>
            </div>
          </div>

        </header>
      </div>
    );
  }
}
