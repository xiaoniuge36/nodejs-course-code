const buffer = new ArrayBuffer(10);

        const dataView = new DataView(buffer);

        dataView.setUint16(0, 256);

        console.log(dataView.getUint16(0));

        console.log(dataView.getUint8(0));
        console.log(dataView.getUint8(8));