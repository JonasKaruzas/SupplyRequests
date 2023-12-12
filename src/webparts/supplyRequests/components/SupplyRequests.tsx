import * as React from 'react';
import { useState, useEffect } from 'react';
// import styles from './SupplyRequests.module.scss';
import type { ISupplyRequestsProps } from './ISupplyRequestsProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const SupplyRequests: React.FC<ISupplyRequestsProps> = (props: ISupplyRequestsProps) => {
  const {
    // description,
    // isDarkTheme,
    // environmentMessage,
    // hasTeamsContext,
    // userDisplayName,
    context
  } = props;

  const sp = spfi().using(SPFx(context));

  const [requestsList, setRequestsList] = useState<any[]>([])

  useEffect(() => {
    const getListItems = async () => {
      try {
        const items: any[] = await sp.web.lists.getByTitle("Requests").items();
        setRequestsList(items)
      } catch (error) {
        console.log(error);
      }
    }
    
    getListItems()
    .catch(console.error)
  },[])

  console.log(requestsList);
  
  
  return (
    <div>Hi</div>

    // <section className={`${styles.supplyRequests} ${hasTeamsContext ? styles.teams : ''}`}>
    //   <div className={styles.welcome}>
    //     <img
    //       alt=""
    //       src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')}
    //       className={styles.welcomeImage}
    //     />
    //     <h2>Well done, {escape(userDisplayName)}!</h2>
    //     <div>{environmentMessage}</div>
    //     <div>Web part property value: <strong>{escape(description)}</strong></div>
    //   </div>
    //   <div>
    //     <h3>Welcome to SharePoint Framework!</h3>
    //     <h3>{list}</h3>
    //     {/* <h3>{requestsList}</h3> */}
    //     {/* <p>
    //       The SharePoint Framework (SPFx) is an extensibility model for Microsoft Viva, Microsoft Teams, and SharePoint.
    //       It's the easiest way to extend Microsoft 365 with automatic Single Sign-On, automatic hosting, and industry-standard tooling.
    //     </p> */}
    //     <h4>Learn more about SPFx development:</h4>
    //     <ul className={styles.links}>
    //       <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
    //       <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
    //       <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
    //     </ul>
    //   </div>
    // </section>
  );
};

export default SupplyRequests;
