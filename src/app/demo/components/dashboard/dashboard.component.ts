import { Component, OnInit, OnDestroy } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { PrimeIcons } from 'primeng/api';
import {environment} from "../../../../environments/environment";
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashborad.component.css' ],
    styles: [
        `:host ::ng-deep {
            .speeddial-circle-demo {
                .p-speeddial-quarter-circle {
                    &.p-speeddial-direction-up-left {
                        right: 0;
                        bottom: 0;
                    }

                    &.p-speeddial-direction-up-right {
                        left: 0;
                        bottom: 0;
                    }

                    &.p-speeddial-direction-down-left {
                        right: 0;
                        top: 0;
                    }

                    &.p-speeddial-direction-down-right {
                        left: 0;
                        top: 0;
                    }
                }
            }
        }`
    ]
})
export class DashboardComponent implements OnInit, OnDestroy {

    products!: Product[];
    pdfPath = environment.pdfPath;
    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    events: any[];

    isReadMore: boolean = false;
    text: string = 'Uzun bir metin buraya gelecek. Bu metnin tamamını görmek için devamını oku linkine tıklamanız gerekecek...';



    constructor(private productService: ProductService, public layoutService: LayoutService,        private messageService: MessageService ) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });

        this.events = [
            { status: 'Mergen Yazılım A.Ş. Sistemler(MERGENTECH)',url:'https://www.mergentech.com.tr/hakkimizda/', image: 'https://www.mergentech.com.tr/wp-content/uploads/2020/12/mergen-web-site-logo-e1608919008723.png' , date: '6/2016', icon: 'pi pi-graduation-cap', color: '#673AB7', description:'About Us\n' +
                    '\n' +
                    'Mergen Yazılım A.Ş. (MERGENTECH) was established in 1993 in Eskişehir, Turkey, with 100% local capital.\n' +
                    '\n' +
                    'With 30 years of deep-rooted experience, we aim to provide reliable and rapid solutions, helping our customers digitize their processes and gain a competitive edge. In line with this goal, we conduct extensive R&D activities in proportion to advancing technologies and offer advanced software solutions to our clients.\n' +
                    '\n' +
                    'MERGENTECH, which shapes technology with value-creating technology solutions, provides a wide range of services including Hospital Information Management Systems (HBYS), University Information Management Systems (E-Campus), Learning Management Systems (LMS), Electronic Document Management Systems (EBYS), Quality Management Systems (KYS), and Personal Data Protection Law Tracking Systems (KVKK). Our software solutions also encompass Mobile Systems, Business Intelligence Systems, Decision Support Systems, and Artificial Intelligence technologies.' },
            { status: 'Atatürk Üniversitesi Yönetim Bilişim Sistemleri',url:'https://kurumsal.atauni.edu.tr/wp-content/uploads/2024/02/Asset-4.svg',image:'https://kurumsal.atauni.edu.tr/wp-content/uploads/2024/02/Artboard-10-3-768x543.png', date: '09/2013', icon: 'pi pi-graduation-cap', color: '#9C27B0',  description:'Atatürk University is a well-established public university located in Erzurum, Turkey. Founded in 1957, it boasts a large campus and numerous faculties. The university offers a wide range of undergraduate, graduate, and doctoral programs. It significantly contributes to scientific research and innovation, and also supports regional development. Management Information Systems (MIS) is a discipline that examines how information technology can be used to improve the efficiency and effectiveness of organizations. Situated at the intersection of information systems and management sciences, MIS covers topics such as optimizing business processes, enhancing decision-making processes, and supporting strategic planning. Professionals in this field are responsible for managing the flow of information within businesses, conducting data analysis, and developing IT solutions.' },

        ];

    }

    downloadPdf() {
        const link = document.createElement('a');
        link.href = this.pdfPath;
        link.download = 'umit_yildirim_cv.pdf'; // İndirilen dosyanın adı
        link.click();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thank you for download' });
    }
    toggleReadMore() {
        this.isReadMore = !this.isReadMore;
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

    }


    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
