const buffer = new ArrayBuffer(10);

        const arr1 = new Uint16Array(buffer);

        arr1[0] = 256;
        console.log(arr1)
        console.log(arr1.length);
        console.log(arr1.byteLength);

        const arr2 = new Uint8Array(buffer);
        console.log(arr2);
        console.log(arr2.length);
        console.log(arr2.byteLength);