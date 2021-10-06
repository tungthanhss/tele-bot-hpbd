import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Cron} from "@nestjs/schedule";
import * as moment from "moment";

@Injectable()
export class AppService implements OnModuleInit {
    private readonly logger = new Logger(AppService.name);
    private gp3Id = 1134903144;
    private congDoanId = 1134903144;

    private persons = [
        {
            fullname: "Kiều Việt Cường",
            name: "Cường",
            date: "16/10",
            year: 2020,
            prefix: ""
        },
        {
            fullname: "Hoàng Ngọc Hiếu",
            name: "Hiếu",
            date: "28/02",
            year: 2020,
            prefix: ""
        },
        {
            fullname: "Nguyễn Tiến Mạnh",
            name: "Mạnh",
            date: "31/07",
            year: 2020,
            prefix: ""
        },
        {
            fullname: "Phạm Gia Huy",
            name: "Huy",
            date: "17/08",
            year: 2020,
            prefix: ""
        },
        {
            fullname: "Nguyễn Văn Nghĩa",
            name: "Nghĩa",
            date: "21/12",
            year: 2020,
            prefix: ""
        },
        {
            fullname: "Vũ Đức Đạt",
            name: "Đạt",
            date: "07/12",
            prefix: "Anh",
            year: 2020,
            boss: true
        },
        {
            fullname: "Nguyễn Việt Dũng",
            name: "Dũng",
            date: "01/08",
            year: 2020,
            prefix: "Anh"
        },
        {
            fullname: "Trần Việt Hùng",
            name: "Hùng",
            date: "03/07",
            year: 2020,
            prefix: "Anh"
        },
        {
            fullname: "Phạm Đắc Bảo",
            name: "Bảo",
            date: "24/04",
            year: 2020,
            prefix: "Anh"
        },
        {
            fullname: "Nguyễn Thị Sim",
            name: "Sim",
            date: "28/05",
            year: 2020,
            prefix: "Chị"
        },
        {
            fullname: "Phạm Văn Thái",
            name: "Thái",
            date: "01/07",
            year: 2020,
            prefix: "Anh"
        },
        {
            fullname: "Lê Thanh Tùng",
            name: "Tùng",
            date: "06/10",
            year: 2020,
            prefix: ""
        },
        {
            fullname: "Nguyễn Đức Linh",
            name: "Linh",
            date: "10/01",
            year: 2020,
            prefix: ""
        },
        {
            fullname: "Nguyễn Mạnh Quân",
            name: "Quân",
            date: "30/06",
            year: 2020,
            prefix: "Anh"
        },
        {
            fullname: "Phan Văn Khánh",
            name: "Khánh",
            date: "27/01",
            year: 2020,
            prefix: "Anh"
        },
        {
            fullname: "Nguyễn Mạnh Quân",
            name: "Quân",
            date: "30/6",
            year: 2020,
            prefix: "Anh"
        },
        {
            fullname: "Nguyễn Thành Lộc",
            name: "Lộc Fuho",
            date: "08/10",
            year: 2020,
            prefix: ""
        }
    ]
    private bot: any;
    private listVideo = [
        'public/actor.mp4', 'public/dog.mp4', 'public/mion.mp4', 'public/person2.mp4', 'public/princess.mp4'
    ]

    private sep = [
        {
            data: "Chúc mừng sinh nhật sếp nhà ta\n" +
                "\n" +
                "Có mấy chút thơ đọc gọi là\n" +
                "\n" +
                "Mừng cho sếp được thêm tuổi mới\n" +
                "\n" +
                "Rạng rỡ công danh sự nghiệp thành\n" +
                "\n" +
                "Hạnh phúc tiền tài luôn tấp nập\n" +
                "\n" +
                "Gia đình trẻ nhỏ tiếng cười vui\n" +
                "\n" +
                "Sức khỏe dồi dào, tăng gia mạnh\n" +
                "\n" +
                "Buôn bán kinh doanh, lợi nhuận nhiều."
        }
    ]

    private nhanvien = [
        {
            data: "Sinh nhật, sinh nhật.\n" +
                "Tất bật nhưng vui.\n" +
                "Có món quà cùi.\n" +
                "Làm thơ tặng bạn.\n" +
                "Xin chúc cho bạn.\n" +
                "Mạnh khỏe, bình an.\n" +
                "Tương lai rõ ràng.\n" +
                "Thành công rực rỡ."
        },
        {
            data: "Hôm nay ..." +
                "\n" +
                "Chúc Mừng Bạn được sinh ra trong đời\n" +
                "Chúc bạn vui vẻ thảnh thơi\n" +
                "Sức khỏe tuyệt vời, cuộc sống an khang\n" +
                "Chúc bạn kiến thức vững vàng\n" +
                "Giúp bạn phát triển hành trang ngành nghề\n" +
                "Chúc bạn thỏa chí đam mê\n" +
                "Thành công, thành đạt tràn trề ước mơ"
        }
    ]

    getHello(): string {
        return 'Hello World!';
    }

    botMessage() {
        process.env.NTBA_FIX_319 = "1";
        const TelegramBot = require('node-telegram-bot-api');

        const token = '2008063505:AAGNeV9TkSXmsaKeGXZXREJgNHEz62NkoDY';

        this.bot = new TelegramBot(token, {polling: true});
        this.bot.on('message', (msg) => {
            console.log(msg)
            let Hi = "hi";
            if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
                this.bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + " what would you like to know about me ?");
            }
            let response = "Who are you";
            if (msg.text.toString().toLowerCase().includes("who")) {
                this.bot.sendMessage(msg.chat.id, "I am an intelligent telegram robot");
            }

            let response2 = "Do you love JavaScript";
            if (msg.text.toString().toLowerCase().includes("javascript")) {
                this.bot.sendMessage(msg.from.id, "Oh, did I hear you say JavaScript? \n I really love JavaScript");
            }
        });

    }

    onModuleInit(): any {
        this.botMessage();
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private title = '✴♥ ‿ ♥✴♥ ‿ ♥✴♥ ‿ ♥✴♥ ‿ ♥✴♥ ‿ ♥✴\n'

    @Cron('45 * * * * *')
    handleCron() {
        this.persons.forEach(item => {
            let today = moment().format('DD/MM')
            let next2day = moment().add(2, 'd').format('DD/MM');

            if (today == item.date) {
                let opts = {
                    parse_mode: 'Markdown'
                }
                let yearOld = moment().year() - item.year;
                let rdMessageNumber = this.getRndInteger(0, this.nhanvien.length);
                let message = this.title + "*Chúc mừng sinh nhật " + item.prefix + " " + item.name + " vừa tròn " + yearOld + " tuổi!*\n \n" + this.nhanvien[rdMessageNumber].data;
                this.bot.sendMessage(this.gp3Id, message, opts);
                let number = this.getRndInteger(0, 4);
                console.log(number);
                this.bot.sendAnimation(this.gp3Id, this.listVideo[number]);
            }
            if (next2day == item.date) {
                let yearOld = moment().year() - item.year;
                let message = this.title + "Hai ngày tới là sinh nhật " + yearOld +  " tuổi của " + item.prefix + " " + item.name + " nhé!\n";
                this.bot.sendMessage(this.congDoanId, message);
            }
        })
    }


}
