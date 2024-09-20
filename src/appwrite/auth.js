import config from "../env/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw new Error("A user with the same id or email already exists!");
        }
    }

    async emailVerification() {
        try {
          return await this.account.createVerification(`${config.oauthEndpoint}/verify-email`);
        } catch (error) {
          throw error;
        }
      } 


 async verifyEmail(userId, secret) {
    try {
      return await this.account.updateVerification(userId, secret);
    } catch (error) {
      throw error;
  }
  }

  async resetPassword(email) {
    try {
      return await this.account.createRecovery(email, `${config.oauthEndpoint}/reset-password-page`);
    } catch (error) {
      throw error;
    }
  }
   
  async updatePassword(userId, secret, password,confirmPassword) {
    try {
      return await this.account.updateRecovery(userId, secret, password, confirmPassword);
    } catch (error) {
      throw error;
    }
  }

     OAuthLogin() {
        try {
          return this.account.createOAuth2Session(
            'github',
            //  'https://pencrafted.vercel.app/',
            //  `https://pencrafted.vercel.app/signup`,
            'http://localhost:5173/',
            `http://localhost:5173/signup`,
            );
        } catch (error) {
          throw error;
        }
      }
    
      OAuthLogingoogle() {
        try {
          return this.account.createOAuth2Session(
            'google',
            // 'https://pencrafted.vercel.app/',
            // `https://pencrafted.vercel.app/signup`,
            'http://localhost:5173/',
            `http://localhost:5173/signup`,
            );
        } catch (error) {
          throw error;
        }
      }
       
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw new Error("Invalid email or password");
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


