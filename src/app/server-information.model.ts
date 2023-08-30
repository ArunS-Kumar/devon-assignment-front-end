export class ServerInformation {
    id!: number;
    model!: string;
    ram!: string;
    hdd!: string;
    location!: string;
    price!: string;

    constructor(
        id: number,
        model: string,
        ram: string,
        hdd: string,
        location: string,
        price: string
    ) {
        this.id = id;
        this.model = model;
        this.ram = ram;
        this.hdd = hdd;
        this.location = location;
        this.price = price;
    }
}
