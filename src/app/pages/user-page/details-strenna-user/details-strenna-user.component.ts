import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StrenneManagementService } from 'src/app/pages/strenne-management/strenne-management.service';
import { formatDate } from '@angular/common';
import { StrennaInfo } from 'src/app/pages/strenne-management/strenna-list-item.model';
import { MatTableDataSource } from '@angular/material/table';
import { ExtendedStrennaDTO } from 'src/app/shared/model/extended-strenna.model';
import { RecipientDTO } from 'src/app/shared/model/recipient.model';
import { Strenna, StrennaDTO } from 'src/app/shared/model/strenna.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-details-strenna-user',
  templateUrl: './details-strenna-user.component.html',
  styleUrls: ['./details-strenna-user.component.css']
})
export class DetailsStrennaUserComponent implements OnInit {
  collectionSize: any = 0;
  dataSource = new MatTableDataSource<StrennaInfo>();
  tableItems: any[] = [];
  @Input() customRouterLink: string;
  @Input() linkText: string;
  @Input() title: string;
  @Input() subtitle: string;

  isDesktopView = true;
  lastStrennaFilter: any;

  id_strenna: any;

  list: Strenna[];
  result: Strenna;

  infoList: ExtendedStrennaDTO[] = [];
  info: ExtendedStrennaDTO;
  myRecipient: RecipientDTO;
  myStrenna: StrennaDTO;

  recipient: any;
  strenna: any;
  response: any;

  backLink : string ; 
  constructor(private route: ActivatedRoute,
    private strenneManagementService: StrenneManagementService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
    this.id_strenna = +this.route.snapshot.paramMap.get('id_strenna');
  }

  ngOnInit() {

    this.backLink = "/"+history.state['data'].from ;
    console.log("history.state['data'].from : " , history.state['data'].from) ; 
    console.log("history.state['data'].strenna : " , history.state['data'].strenna) ; 

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => { this.isDesktopView = !result.matches; });


    const passedStrenna = history.state['data'].strenna;

    if (passedStrenna === undefined) {
      this.router.navigate(["user-page"]);
    }
    this.recipient = passedStrenna.recipient;
    this.strenna = passedStrenna.strenna;
    this.response = passedStrenna.strennaResponse;

  }

  formatData(data: string): string {
    if (data) {
      const formattedDate = formatDate(data, 'dd/MM/yy', 'en-US');
      return formattedDate;
    } else {
      return "";
    }
  }

  navigateToEdit(id_strenna: number) {
    const strennaToPass = {
      recipient: this.recipient,
      strenna: this.strenna,
      strennaResponse: this.response
    };
    this.router.navigate(['edit-strenna'], { state: { data: strennaToPass } });
  }



  getFilteredStrenneList(strenna = undefined) {
    this.lastStrennaFilter = strenna;
    let id_receiver = null;
    let id_strenna = null;
    let is_director = null;
    let sender = null;
    let handling = null;
    let method = null;
    let strenna_type = null;
    let bulky = null;
    let perishable = null;
    let date = null;
    let withdrawal_date = null;
    let status = null;
    let max_rows = null;
    let page = null;
    if (strenna) {
      id_receiver = strenna.id_receiver;
      id_strenna = strenna.id_strenna;
      is_director = strenna.is_director;
      sender = strenna.sender;
      handling = strenna.handling;
      method = strenna.method;
      strenna_type = strenna.strenna_type;
      bulky = strenna.bulky;
      perishable = strenna.perishable;
      date = strenna.date;
      withdrawal_date = strenna.withdrawal_date;
      status = strenna.status;
      max_rows = strenna.max_rows;
      page = strenna.page;
    }
    this.strenneManagementService.getFilteredStrenneList(
      id_receiver,
      id_strenna,
      is_director,
      sender,
      handling,
      method,
      strenna_type,
      bulky,
      perishable,
      date,
      withdrawal_date,
      status,
      max_rows,
      page
    ).pipe()
      .subscribe(r => {
        const infoList: StrennaInfo[] = [];
        this.collectionSize = r?.output?.totalCount;
        const result = r?.output?.list;
        if (!!result) {
          result.forEach(element => {
            const info: StrennaInfo = {
              name: element.recipient.user_name + ' ' + element.recipient.user_surname,
              id_strenna: element.strenna.id_strenna,
              is_director_or_board: element.recipient.is_director_or_board,
              sender: element.strenna.sender,
              date: element.strenna.date,
              status: element.strenna.status,
            };
            infoList.push(info);
          });
          this.tableItems;
        }
        this.dataSource.data = infoList;
        return infoList;
      });
  }



}
