import { TransactionHelper } from './transaction';

export class TxMijinService {
    transactionHelper: TransactionHelper;
    constructor() {
        this.transactionHelper = new TransactionHelper();
    }

    async createShipment(
        buyerPrivateKeyName: string, sellerPublicKeyName: string,
        countSellerGoods: number, nameGoods: string, countBuyerCurrency: number) {
        return await this.transactionHelper.createShipment(buyerPrivateKeyName, sellerPublicKeyName,
            countSellerGoods, nameGoods, countBuyerCurrency);
    }

    async confirm(multisigPrivateKeyName: string, cosignerPrivateKeyName: string) {
        return await this.transactionHelper.confirmMultisig(multisigPrivateKeyName, cosignerPrivateKeyName);
    }
}