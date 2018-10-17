import { AccountHelper } from './account';

export class AccountMijinService {
    accountHelper: AccountHelper;
    constructor() {
        this.accountHelper = new AccountHelper();
    }

    async createMultisig(nameMultisigPrivate: string, consigners: string[]) {
        return await this.accountHelper.createMultisigAccount(nameMultisigPrivate, consigners);
    }

    async accountInfo(pubKey: string) {
        return await this.accountHelper.getAccountInfo(pubKey);
    }
}