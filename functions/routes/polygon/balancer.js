
// Imports:
const { ethers } = require('ethers');
const { minABI, balancer } = require('../../static/ABIs.js');
const { query, addBalancerToken } = require('../../static/functions.js');

// Initializations:
const chain = 'poly';
const project = 'balancer';
const vault = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
const poolIDs = [
  '0x01abc00e86c7e258823b9a055fd62ca6cf61a163000100000000000000000014',
  '0x021c343c6180f03ce9e48fae3ff432309b9af19900020000000000000000000d',
  '0x0297e37f1873d2dab4487aa67cd56b58e2f27875000100000000000000000002',
  '0x03cd191f589d12b0582a99808cf19851e468e6b500010000000000000000000a',
  '0x06df3b2bbb68adc8b0e302443692037ed9f91b42000000000000000000000012',
  '0x09804caea2400035b18e2173fdd10ec8b670ca0900020000000000000000000f',
  '0x0a9e96988e21c9a03b8dc011826a00259e02c46e000100000000000000000024',
  '0x148ce9b50be946a96e94a4f5479b771bab9b1c59000100000000000000000023',
  '0x15432ba000e58e3c0ae52a5dec0579215ebc75d000020000000000000000003b',
  '0x186084ff790c65088ba694df11758fae4943ee9e000200000000000000000032',
  '0x2d6e3515c8b47192ca3913770fa741d3c4dac35400020000000000000000003f',
  '0x32fc95287b14eaef3afa92cccc48c285ee3a280a000100000000000000000005',
  '0x344e8f99a55da2ba6b4b5158df2143374e400df200020000000000000000003d',
  '0x36128d5436d2d70cab39c9af9cce146c38554ff0000100000000000000000008',
  '0x38a01c45d86b61a70044fb2a76eac8e75b1ac78e000200000000000000000013',
  '0x39cd55ff7e7d7c66d7d2736f1d5d4791cdab895b000100000000000000000037',
  '0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000100000000000000000004',
  '0x41175c3ee2dd49fca9b263f49525c069095b87c700020000000000000000003a',
  '0x45910faff3cbf990fdb204682e93055506682d17000200000000000000000016',
  '0x4626d81b3a1711beb79f4cecff2413886d46167700020000000000000000001c',
  '0x494b26d4aee801cb1fabf498ee24f0af20238743000200000000000000000043',
  '0x4e7f40cd37cee710f5e87ad72959d30ef8a01a5d00010000000000000000000b',
  '0x503717b3dc137e230afc7c772520d7974474fb70000200000000000000000041',
  '0x571046eae58c783f29f95adba17dd561af8a8712000200000000000000000015',
  '0x58af920d9dc0bc4e8f771ff013d79215cabcaa9e00010000000000000000002a',
  '0x59e2563c08029f13f80cba9eb610bfd0367ed266000200000000000000000042',
  '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000034',
  '0x606e3ccc8c51cbbb1ff07ad03c6f95a84672ab1600010000000000000000002d',
  '0x614b5038611729ed49e0ded154d8a5d3af9d1d9e00010000000000000000001d',
  '0x61d5dc44849c9c87b0856a2a311536205c96c7fd000200000000000000000000',
  '0x647c1fd457b95b75d0972ff08fe01d7d7bda05df000100000000000000000001',
  '0x67f8fcb9d3c463da05de1392efdbb2a87f8599ea00010000000000000000002b',
  '0x72ab6ff76554f90532e2809cee019ade724e029a000200000000000000000020',
  '0x7320d680ca9bce8048a286f00a79a2c9f8dcd7b3000100000000000000000044',
  '0x7bf521b4f4c1543a622e11ee347efb1a23743322000100000000000000000028',
  '0x7eb878107af0440f9e776f999ce053d277c8aca800020000000000000000002f',
  '0x80be0c303d8ad2a280878b50a39b1ee8e54dbd22000200000000000000000018',
  '0x8bda1ab5eead21547ba0f33c07c86c5dc48d9baa000100000000000000000027',
  '0x991aeafbe1b1c7ac8348dc623ae350768d0c65b3000100000000000000000007',
  '0x9e7fd25ad9d97f1e6716fa5bb04749a4621e892d000100000000000000000011',
  '0x9f19a375709baf0e8e35c2c5c65aca676c4c7191000200000000000000000022',
  '0xa6f548df93de924d73be7d25dc02554c6bd66db5000200000000000000000017',
  '0xb2634e2bfab9664f603626afc3d270be63c09ade000200000000000000000021',
  '0xb6b9b165c4ac3f5233a0cf413126c72be28b468a000100000000000000000026',
  '0xb82a45ea7c6d7c90bd95e9e2af13242538f2e26900020000000000000000003e',
  '0xc6a5032dc4bf638e15b4a66bc718ba7ba474ff73000100000000000000000003',
  '0xce66904b68f1f070332cbc631de7ee98b650b499000100000000000000000009',
  '0xd16847480d6bc218048cd31ad98b63cc34e5c2bf000200000000000000000040',
  '0xd208168d2a512240eb82582205d94a0710bce4e7000100000000000000000038',
  '0xd47c0734a0b5feff3bb2fc8542cd5b9751afeefb00020000000000000000000e',
  '0xd57b0ee9e080e3f6aa0c30bae98234359e97ea9800020000000000000000000c',
  '0xd5d7bc115b32ad1449c6d0083e43c87be95f2809000100000000000000000033',
  '0xdb1db6e248d7bb4175f6e5a382d0a03fe3dcc813000100000000000000000035',
  '0xdb3e5cf969c05625db344dea9c8b12515e235df3000200000000000000000030',
  '0xde620bb8be43ee54d7aa73f8e99a7409fe511084000100000000000000000029',
  '0xe0947a0d847f9662a6a22ca2eff9d7e6352a123e000200000000000000000039',
  '0xe2cd73cfeb471f9f2b08a18afbc87ff2324ef24e000100000000000000000025',
  '0xe54b3f5c444a801e61becdca93e74cdc1c4c1f9000020000000000000000003c',
  '0xe8075304a388f2f9b2af61f502741a88ff21d9a4000100000000000000000031',
  '0xea8886a24b6e01fba88a9e98d794e8d1f29ed863000200000000000000000019',
  '0xeb58be542e77195355d90100beb07105b9bd295e00010000000000000000001b',
  '0xf099b7c3bd5a221aa34cb83004a50d66b0189ad0000100000000000000000036',
  '0xf461f2240b66d55dcf9059e26c022160c06863bf000100000000000000000006',
  '0xf7cd489c2b7e199e2d3e8a982eb6fd51d71c1ce400020000000000000000001f',
  '0xf93e20844fd084b657d5e71342157b36c5f3032d00010000000000000000001a',
  '0xf94a7df264a2ec8bceef2cfe54d7ca3f6c6dfc7a00020000000000000000002c',
  '0xfeadd389a5c427952d8fdb8057d6c8ba1156cc5600020000000000000000001e'
];

/* ========================================================================================================================================================================= */

// GET Function:
exports.get = async (req) => {

  // Initializing Response:
  let response = {
    status: 'ok',
    data: [],
    request: req.originalUrl
  }

  // Getting Wallet Address:
  const wallet = req.query.address;

  // Checking Parameters:
  if(wallet != undefined) {
    if(ethers.utils.isAddress(wallet)) {
      try {
        response.data.push(...(await getPoolBalances(wallet)));
      } catch {
        response.status = 'error';
        response.data = [{error: 'Internal API Error'}];
      }
    } else {
      response.status = 'error';
      response.data = [{error: 'Invalid Wallet Address'}];
    }
  } else {
    response.status = 'error';
    response.data = [{error: 'No Wallet Address in Request'}];
  }

  // Returning Response:
  return JSON.stringify(response);
}

/* ========================================================================================================================================================================= */

// Function to get all pool balances:
const getPoolBalances = async (wallet) => {
  let balances = [];
  let promises = poolIDs.map(id => (async () => {
    let address = (await query(chain, vault, balancer.vaultABI, 'getPool', [id]))[0];
    let balance = parseInt(await query(chain, address, minABI, 'balanceOf', [wallet]));
    if(balance > 0) {
      let newToken = await addBalancerToken(chain, project, address, balance, wallet, id);
      balances.push(newToken);
    }
  })());
  await Promise.all(promises);
  return balances;
}