const bip39 = require('bip39');
const fs = require('fs');
const { Wallet,hdkey } = require('ethereumjs-wallet')
const ExcelJS = require('exceljs');


class WalletInfo {
  constructor(mnemonic, privateKey, address) {
    this.mnemonic = mnemonic;
    this.privateKey = privateKey;
    this.address = address;
  }
}

// 要创建的钱包数量
function create_wallets(walletCount) {

  console.log('11');
  // 创建新的 Excel 文件
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Wallet Info');
  add_excel_header(worksheet);


  for(let i = 0; i < walletCount; i++){
    console.log("\n\n");
    const mnemonic = bip39.generateMnemonic();
    console.log(`助记词: ${mnemonic}`);

    // const password = 'AaBbCc_1234'; // optional password to encrypt private key

    // const seed = bip39.mnemonicToSeed(mnemonic, password);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    // console.log(`seed: ${seed}`);

    const hdWallet = hdkey.fromMasterSeed(seed);
    const wallet = hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    // console.log(`Address: ${wallet.getAddressString()}`);

    const walletAddress = wallet.getAddress().toString('hex');
    const privateKey = wallet.getPrivateKey().toString('hex') + "\n";

    console.log(`地址: ${walletAddress}`);
    console.log(`私钥: ${privateKey}`);
    let info = new WalletInfo(mnemonic, privateKey, walletAddress);
    // write_to_txt(i+1, mnemonic, privateKey, walletAddress);
    add_excel_row(worksheet, info);
  }

  const currentDateTime = getCurrentDateTime();
  const filename = `wallet_${currentDateTime}.xlsx`;
  save_excel(workbook, filename);
}


function add_excel_header(worksheet) {
  // 添加表头
  worksheet.getCell('A1').value = '助记词';
  worksheet.getCell('B1').value = '私钥';
  worksheet.getCell('C1').value = '地址';
}

function save_excel(workbook, filename) {
  // 保存 Excel 文件
  workbook.xlsx.writeFile(filename)
    .then(() => {
      console.log('创建新的 ' + filename + ' 文件并写入钱包信息成功');
    })
    .catch((error) => {
      console.error('写入文件时出错:', error);
    });
}

function add_excel_row(worksheet, info) {
  // 追加钱包信息到下一行
  const row = worksheet.addRow();
  row.getCell('A').value = info.mnemonic;
  row.getCell('B').value = info.privateKey;
  row.getCell('C').value = info.address;
}



// 将结果写入文件 txt
function write_to_txt(index, info) {
  const currentDateTime = getCurrentDateTime();
  console.log(currentDateTime);
  const txtFileName = `wallet_info_${currentDateTime}.txt`;
  const content = `==========序号：${index}===========\n
    助记词: \n${info.mnemonic}\n
    私钥: \n${info.privateKey}\n
    钱包地址: \n${info.address}\n\n`;
  fs.appendFile(txtFileName, content, (err) => {
    if (err) {
      console.error('写入文件时出错:', err);
    } else {
      console.log('钱包信息已成功写入 wallet_info.txt 文件');
    }
  });
}

function getCurrentDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}_${hours}_${minutes}_${seconds}`;
}

document.getElementById("createWallet").addEventListener("click", function () {
  create_wallets(1)
});


module.exports = create_wallets
