angular.module('ebApp').factory('ebUsers', function() {
  'use strict';
  return {
    u1: {
      id: 'u1',
      sessionId: 's1234',
      name: 'Unknown User',
      img: 'images/anonymous.svg',
      color: '#25ae88',
      viewed: [],
      purchased: [],
      searchConfig: {
        maxvb: 5.0,
        maxpb: 5.0,
        nb: 10.0,
        db: 10.0,
        ab: 10.0,
        vbp: 1.1,
        pbp: 1.1,
        psdMinS: 0.0,
        psdMaxS: 1.0,
        pBal: 4.0,
        psEnable: false,
        enableMetrics: true,
        items: 25,
        psdItem: 25
      }
    },
    u2: {
      id: 'u2',
      sessionId: 's1234',
      name: 'John Doe',
      img: 'images/johnDoe.svg',
      color: '#f76363',
      viewed: [
        {
          id: '40118991',
          image: 'https://assets.burberry.com/is/image/Burberryltd/9464b13b7e7b60ee16691f2cd9c7737fb617cf04?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Men',
            'Clothing',
            'Trousers & Shorts',
            'Formal']
        },
        {
          id: '40119021',
          image: 'https://assets.burberry.com/is/image/Burberryltd/abdb23b43b59233be4f754c60a252323075b4194?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Men',
            'Clothing',
            'Trousers & Shorts',
            'Formal']
        },
        {
          id: '40056531',
          image: 'https://assets.burberry.com/is/image/Burberryltd/36cf00f0787eead86adf6454848a0510a1246bb0?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Men',
            'Clothing',
            'Casual Shirts',
            'Check']
        },
        {
          id: '45547111',
          image: 'https://assets.burberry.com/is/image/Burberryltd/5a2f29e3d9ee9680ace929d1b8be2a6c5b94ea2a?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Men',
            'Clothing',
            'Casual Shirts',
            'Check']
        },
        {
          id: '38723291',
          image: 'https://assets.burberry.com/is/image/Burberryltd/1de7abcd2646c3a4425cdc494291c0257c5a821b?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Men',
            'Clothing',
            'Polos & T-Shirts',
            'T-shirts']
        },
        {
          id: '39742111',
          image: 'https://assets.burberry.com/is/image/Burberryltd/5e7d584a61df4c8496682f1bb363b71d095df2a0?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Men',
            'Clothing',
            'Polos & T-Shirts',
            'T-shirts']
        },
        {
          id: '39810501',
          image: 'https://assets.burberry.com/is/image/Burberryltd/98b62038740b15c3cf0292eeb00062ca9ea46bb1?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Men', 'Shoes', 'Trainers']
        },
        {
          id: '40033631',
          image: 'https://assets.burberry.com/is/image/Burberryltd/be170b78586aa9953650d5b32bd8af507ec73e60?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Men', 'Shoes', 'Trainers']
        }
      ],
      purchased: [],
      searchConfig: {
        maxvb: 5.0,
        maxpb: 5.0,
        nb: 10.0,
        db: 10.0,
        ab: 10.0,
        vbp: 1.1,
        pbp: 1.1,
        psdMinS: 0.0,
        psdMaxS: 0.0,
        pBal: 4.0,
        psEnable: true,
        enableMetrics: true,
        items: 25,
        psdItem: 25
      }
    },
    u3: {
      id: 'u3',
      sessionId: 's1234',
      name: 'Jane Doe',
      img: 'images/janeDoe.svg',
      color: '#ffa055',
      viewed: [
        {
          id: '40223651',
          image: 'https://assets.burberry.com/is/image/Burberryltd/f6377885176deaac5d2c7aea3aad8029722fad95?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Clothing',
            'Dresses',
            'Women',
            'New Arrivals',
            'Weekend Getaway',
            'Clothing',
            'Women',
            'Clothing',
            'Dresses',
            'Dresses']
        },
        {
          id: '40429451',
          image: 'https://assets.burberry.com/is/image/Burberryltd/e0a5bb787c9949e940d027e47ac0bfe68db39261?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women', 'Shoes', 'Trainers', 'Women', 'Shoes', 'All Shoes', 'Trainers']
        },
        {
          id: '40299561',
          image: 'https://assets.burberry.com/is/image/Burberryltd/dbb3f8c3fd4e28f48b66c5ec5c68034e3feae826?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Bags',
            'Shoulder Bags',
            'Shoulder Bags']
        },
        {
          id: '45454861',
          image: 'https://assets.burberry.com/is/image/Burberryltd/9789bc6eecd0ac163ab405b2f773991b407f9d48?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Clothing',
            'All Clothing',
            'September 2016 runway',
            'Women',
            'Clothing',
            'Jackets',
            'September 2016 runway',
            'Women',
            'Clothing',
            'Jackets',
            'Lightweight']
        },
        {
          id: '40349831',
          image: 'https://assets.burberry.com/is/image/Burberryltd/358f63bec12865cdfb8de20fd14b65e94ccb4ea0?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Clothing',
            'All Clothing',
            'Skirts & Trousers']
        }
      ],
      purchased: [],
      searchConfig: {
        maxvb: 5.0,
        maxpb: 5.0,
        nb: 10.0,
        db: 10.0,
        ab: 10.0,
        vbp: 1.1,
        pbp: 1.1,
        psdMinS: 0.0,
        psdMaxS: 0.0,
        pBal: 4.0,
        psEnable: true,
        enableMetrics: true,
        items: 25,
        psdItem: 25
      }
    },
    u4: {
      id: 'u4',
      sessionId: 's1234',
      name: 'Richard Miles',
      img: 'images/Mike.svg',
      color: '#00dccd',
      viewed: [
        {
          id: '40423601',
          image: 'https://assets.burberry.com/is/image/Burberryltd/a46f140a925a78df1b3d6ecee9317d061ac90d1b?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Men',
            'Clothing',
            'Trousers & Shorts',
            'Casual']
        },
        {
          id: '39843671',
          image: 'https://assets.burberry.com/is/image/Burberryltd/b41ee1fceb3562820b959dfba72261c7ead81a95?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Men',
            'Clothing',
            'Trousers & Shorts',
            'Casual']
        },
        {
          id: '39835171',
          image: 'https://assets.burberry.com/is/image/Burberryltd/b2aa7e6ff1aa27e541a4f24fb1e623e500c0d863?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Men',
            'Clothing',
            'Casual Shirts',
            'Plain']
        }, {
          id: '40430411',
          image: 'https://assets.burberry.com/is/image/Burberryltd/b37c7617e415ea4e14760ed786f5fe962b7d0647?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Men',
            'Clothing',
            'Polos & T-Shirts',
            'T-shirts']
        }, {
          id: '40381991',
          image: 'https://assets.burberry.com/is/image/Burberryltd/b33127f06e6c404cc3168645e099a9eb71aeca9c?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Men',
            'Shoes',
            'Formal']
        }
      ],
      purchased: [],
      searchConfig: {
        maxvb: 5.0,
        maxpb: 5.0,
        nb: 10.0,
        db: 10.0,
        ab: 10.0,
        vbp: 1.1,
        pbp: 1.1,
        psdMinS: 0.0,
        psdMaxS: 0.0,
        pBal: 4.0,
        psEnable: true,
        enableMetrics: true,
        items: 25,
        psdItem: 25
      }
    },
    u5: {
      id: 'u5',
      sessionId: 's1234',
      name: 'Molly',
      img: 'images/Molly.svg',
      color: '#ff6ead',
      viewed: [
        {
          id: '40348751',
          image: 'https://assets.burberry.com/is/image/Burberryltd/1057222564e2986c39fd3d6a449ab065119cacc8?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Clothing',
            'Dresses',
            'Women',
            'Clothing',
            'Dresses',
            'Dresses']
        },
        {
          id: '40306541',
          image: 'https://assets.burberry.com/is/image/Burberryltd/5c6b0c1f2bd850ef3fb4658bd827d53b5871144f?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Women',
            'New Arrivals',
            'English Garden',
            'Accessories']
        },
        {
          id: '40426401',
          image: 'https://assets.burberry.com/is/image/Burberryltd/ffc89a308bfa29414b391338c7a6c5a4e09e4675?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Gifts',
            'Winter Metallics',
            'Accessories']
        },
        {
          id: '40272431',
          image: 'https://assets.burberry.com/is/image/Burberryltd/b60f3de7cce6db4d9fe48fedd47f8d06666a0ad7?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Clothing',
            'Jackets',
            'Tailored']
        },
        {
          id: '40438491',
          image: 'https://assets.burberry.com/is/image/Burberryltd/d54ee201254f523f8914af5322426802982ced88?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Clothing',
            'All Clothing',
            'Skirts & Trousers',
            'Women',
            'Clothing',
            'Skirts & Trousers',
            'Skirts']
        },
        {
          id: '40426511',
          image: 'https://assets.burberry.com/is/image/Burberryltd/0b04c203363c80ef97e54c31750f6ceb9cc2832c?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: ['Women',
            'Clothing',
            'Skirts & Trousers',
            'Skirts',
            'Women',
            'Clothing',
            'All Clothing',
            'Skirts & Trousers']
        },
        {
          id: '40364831',
          image: 'https://assets.burberry.com/is/image/Burberryltd/8c9d00785776ac9ba24ce054644b2aecd939c6c6?$BBY_V2_ML_3X4$&wid=402&hei=536',
          categories: [
            'Women', 'Shoes', 'Boots', 'Heeled Boots']
        }
      ],
      purchased: [],
      searchConfig: {
        maxvb: 5.0,
        maxpb: 5.0,
        nb: 10.0,
        db: 10.0,
        ab: 10.0,
        vbp: 1.1,
        pbp: 1.1,
        psdMinS: 0.0,
        psdMaxS: 0.0,
        pBal: 4.0,
        psEnable: true,
        enableMetrics: true,
        items: 25,
        psdItem: 25
      }
    }
  };
});
