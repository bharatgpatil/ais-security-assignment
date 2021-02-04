import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Observable } from 'rxjs'


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    name: string;
    children ? : FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

    //Code fromm line number 33 to 47 is used from materiul ui compoent to create expand and collpase view to show the urls stucture
    //I wanted to show both page/file name and url but I am only showing urls
    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    }

    treeControl = new FlatTreeControl < ExampleFlatNode > (
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


    domains: [];
    urlsData;

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    constructor(private apiService: ApiService) {
        //Call api to get domains names when component is loaded
        this.getDomains().then(data => {
            this.domains = data;
            console.log(data);
        });
    }


    /**
     * get the domain data 
     */
    private getDomains(): Promise < any > {
        return new Promise((resolve, reject) => {
            this.apiService.getDomains().subscribe(success => {
                resolve(success);
            });
        });
    }

    /**
     * get all urls
     */
    private getUrlsData(): Promise < any > {
        return new Promise((resolve, reject) => {
            this.apiService.getUrls().subscribe(success => {
                resolve(success);
            });
        });
    }

    /**
     * called from UI when user click on the domain
     */
    public getDataSelectedDomain(domain) {
        console.log(domain);
        if (!this.urlsData) {
            this.getUrlsData().then(data => {
                if (data) {
                    this.urlsData = data; //Backend is sending all domains urls together so just save data globaly or in the service when called for the first time 
                    this.dataSource.data = this.handleUrlsData(domain, data);
                }
            });
        } else {
            this.dataSource.data = this.handleUrlsData(domain, this.urlsData);
        }


    }
    /**
     * extracts the data content of the trace file
     */


    public handleUrlsData(domain, urls) {
        /**Here I have modified the urls data and I am assuming that all paths for the domain will be in sequence
        If they are not in sequence then i will need to split them into array of strings e.g.  for the url 'http://www.example.com/admin/users',
        ["example", "admin", "users"] 
        **/

        if (urls) {
            console.log(urls);
            const addreses = [];
            const nestedData = [];
            const urlMap = new Map();

            for (let i = 0; i < urls.length; i++) {
                let parsedDomain = new URL(domain);

                let rootDomain = parsedDomain.hostname.split('.').slice(-2).join('.');
                //check if url contains same clicked domain name and create structure for those found urls only
                if (urls[i].includes(rootDomain)) {
                    addreses.push({
                        'name': urls[i],
                        'children': []
                    });
                }

            }

            console.log(addreses);

            for (let item of addreses) {
                item['children'] = [];
                let address = item.name;
                let lastslash = address.lastIndexOf('/'); //find index of last /
                let prefix = address.substring(0, lastslash);
                if (urlMap.has(prefix)) { // if parent is there then add to that one
                    urlMap.get(prefix).children.push(item)
                } else { // find toplevel node
                    nestedData.push(item);
                }
                urlMap.set(address, item); // store as default parent in any case
            }

            return nestedData;
        }
    }



}