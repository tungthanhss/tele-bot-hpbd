import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Cron} from "@nestjs/schedule";
import * as moment from "moment";

@Injectable()
export class AppService implements OnModuleInit {
    private readonly logger = new Logger(AppService.name);
    private gp3Id = -507953035;
    private congDoanId = -552189417;

    private persons = [
        {
            fullname: "Kiều Việt Cường",
            name: "Cường",
            date: "16/10",
            year: 1992,
            prefix: "Anh"
        },
        {
            fullname: "Hoàng Ngọc Hiếu",
            name: "Hiếu",
            date: "28/02",
            year: 1992,
            prefix: "Anh"
        },
        {
            fullname: "Nguyễn Tiến Mạnh",
            name: "Mạnh",
            date: "31/07",
            year: 1993,
            prefix: "Anh"
        },
        {
            fullname: "Phạm Gia Huy",
            name: "Huy",
            date: "17/08",
            year: 1995,
            prefix: ""
        },
        {
            fullname: "Nguyễn Văn Nghĩa",
            name: "Nghĩa",
            date: "21/12",
            year: 1991,
            prefix: "Anh"
        },
        {
            fullname: "Vũ Đức Đạt",
            name: "Đạt",
            date: "07/12",
            prefix: "Anh",
            year: 1984,
            boss: true
        },
        {
            fullname: "Nguyễn Việt Dũng",
            name: "Dũng",
            date: "01/08",
            year: 1984,
            prefix: "Anh"
        },
        {
            fullname: "Trần Việt Hùng",
            name: "Hùng",
            date: "03/07",
            year: 1989,
            prefix: "Anh"
        },
        {
            fullname: "Phạm Đắc Bảo",
            name: "Bảo",
            date: "24/04",
            year: 1991,
            prefix: "Anh"
        },
        {
            fullname: "Nguyễn Thị Sim",
            name: "Sim",
            date: "28/05",
            year: 1997,
            prefix: "Chị"
        },
        {
            fullname: "Phạm Văn Thái",
            name: "Thái",
            date: "01/07",
            year: 1990,
            prefix: "Anh"
        },
        {
            fullname: "Lê Thanh Tùng",
            name: "Tùng",
            date: "27/10",
            year: 1994,
            prefix: ""
        },
        {
            fullname: "Nguyễn Đức Linh",
            name: "Linh",
            date: "10/01",
            year: 1995,
            prefix: ""
        },
        {
            fullname: "Nguyễn Mạnh Quân",
            name: "Quân",
            date: "30/06",
            year: 1991,
            prefix: "Anh"
        },
        {
            fullname: "Phan Văn Khánh",
            name: "Khánh",
            date: "27/01",
            year: 1998,
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
            date: "26/9",
            year: 1993,
            prefix: "Anh"
        },
        {
            fullname: "Nguyễn Quốc Hùng",
            name: "Hùng",
            date: "01/11",
            year: 1998,
            prefix: "Em"
        }
    ]
    private bot: any;
    private listVideo = [
        'public/actor.mp4', 'public/dog.mp4', 'public/mion.mp4', 'public/person2.mp4', 'public/princess.mp4', 'public/princess.mp4'
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
            data: " Hôm nay sinh nhật bạn\n" +
                "Tớ chẳng có quà đâu\n" +
                "Chỉ có tấm thiệp màu\n" +
                "Làm quà thay lời chúc.\n" +
                "Chúc cho bạn hạnh phúc\n" +
                "Thêm tuổi mới bình yên\n" +
                "Và có thật nhiều tiền\n" +
                "Cùng thành công rực rỡ.\n" +
                "Chúc cho bạn sinh nhật vui vẻ\n" +
                "Cùng gia đình khe khẽ cười vang\n" +
                "Nhất là được cùng với nàng\n" +
                "Nắm tay dạo phố rộn ràng cười vui\n" +
                "Và chúc bạn đẩy lùi buồn khổ\n" +
                "Niềm tin thì tuôn sổ không thôi\n" +
                "Để cho bạn mãi yêu đời\n" +
                "Không còn sầu nhớ một thời đã qua."
        },
        {
            data: "Chúc mừng sinh nhật người ta\n" +
                "Chớ buồn vì những cách xa bây giờ!\n" +
                "Ngày mai giáp mộng đôi bờ…\n" +
                "Niềm vui bù lại trăm chờ vạn mong,\n" +
                "Hôm nay thắp ngọn nến hồng,\n" +
                "Chúc mừng sinh nhật hiệp lòng nhất tâm!\n" +
                "Chúc qua bão gió thăng trầm\n" +
                "Bằng an vạn sự trăm năm quân hoà,\n" +
                "Lời thơ chấp bút thăng hoa,\n" +
                "Thay quà sinh nhật của ta tặng người!\n" +
                "Chúc mai một giấc mộng đời,\n" +
                "Luôn luôn như ý như lời thơ ca."
        },
        {
            data:  " Sinh nhật vui vẻ Ý nha.\n" +
                "Chúc cho hạnh phúc đậm đà tình yêu.\n" +
                "Chúc cho sức khỏe thật nhiều.\n" +
                "Chúc cho may mắn vạn điều bình an.\n" +
                "Lắm tiền, nhiều bạc giàu sang.\n" +
                "Niềm vui, hạnh phúc càng ngày càng xinh.\n" +
                "Chúc luôn sung túc gia đình.\n" +
                "Thành công tiếp nối hành trình công danh.\n" +
                "Chúc cho ấp áp an lành.\n" +
                "Bao nhiêu hạnh phúc quây quanh mỗi ngày.\n" +
                "Không buồn cũng chẳng đắng cay.\n" +
                "Không đau chẳng khổ mỗi ngày cười thôi.\n" +
                "Nụ cười sẽ mãi trên môi.\n" +
                "Hãy luôn chia sẻ cùng tôi..nếu cần.\n" +
                "Vai này dựa nhé bạn thân.\n" +
                "Nhớ là tôi mãi ở gần bạn thôi !"
        },
        {
            data:  " Sinh nhật vui vẻ Ý nha.\n" +
                "Chúc cho hạnh phúc đậm đà tình yêu.\n" +
                "Chúc cho sức khỏe thật nhiều.\n" +
                "Chúc cho may mắn vạn điều bình an.\n" +
                "Lắm tiền, nhiều bạc giàu sang.\n" +
                "Niềm vui, hạnh phúc càng ngày càng xinh.\n" +
                "Chúc luôn sung túc gia đình.\n" +
                "Thành công tiếp nối hành trình công danh.\n" +
                "Chúc cho ấp áp an lành.\n" +
                "Bao nhiêu hạnh phúc quây quanh mỗi ngày.\n" +
                "Không buồn cũng chẳng đắng cay.\n" +
                "Không đau chẳng khổ mỗi ngày cười thôi.\n" +
                "Nụ cười sẽ mãi trên môi.\n" +
                "Hãy luôn chia sẻ cùng tôi..nếu cần.\n" +
                "Vai này dựa nhé bạn thân.\n" +
                "Nhớ là tôi mãi ở gần bạn thôi !"
        },
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
                this.bot.sendMessage(msg.from.id, "Hello 1.5");
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

    private title = '✴♥ ‿ ♥✴♥ ‿ ♥✴♥ ‿ ♥✴♥ ‿ ♥✴♥ ‿ ♥✴\n';

    @Cron('15 8 * * *')
    handleCron() {
        this.bot.sendMessage(1134903144, 'HEATH CHECK');
        this.persons.forEach(item => {
            let today = moment().format('DD/MM');
            let next2day = moment().add(2, 'd').format('DD/MM');

            if (today == item.date) {
                let opts = {
                    parse_mode: 'Markdown'
                }
                let yearOld = moment().year() - item.year;
                let rdMessageNumber = this.getRndInteger(0, this.nhanvien.length);
                let message = this.title + "\n*Chúc mừng sinh nhật " + item.prefix + " " + item.name + " vừa tròn " + yearOld + " tuổi!*\n \n" + this.nhanvien[rdMessageNumber].data;
                this.bot.sendMessage(this.gp3Id, message, opts);
                this.bot.sendMessage(1134903144, message, opts);
                let number = this.getRndInteger(0, 5);
                console.log(number);
                this.bot.sendAnimation(this.gp3Id, this.listVideo[number]);
            }
            if (next2day == item.date) {
                let yearOld = moment().year() - item.year;
                let message = this.title + "Hai ngày tới là sinh nhật " + yearOld + " tuổi của " + item.prefix + " " + item.fullname + " nhé!\n";
                this.bot.sendMessage(1134903144, message);
                this.bot.sendMessage(this.congDoanId, message);
            }
        })
    }


}
