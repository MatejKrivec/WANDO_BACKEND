import * as AWS from 'aws-sdk';  // Ensure AWS SDK is imported
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private cognito: AWS.CognitoIdentityServiceProvider;

  constructor() {
    this.cognito = new AWS.CognitoIdentityServiceProvider({
      region: process.env.COGNITO_REGION,
    });
  }

  async signUp(username: string, password: string, email: string) {
    const clientId = process.env.COGNITO_CLIENT_ID;
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Cognito Client ID or Client Secret is not defined');
    }

    // Calculate the SECRET_HASH
    const secretHash = this.calculateSecretHash(username, clientId, clientSecret);

    const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId: clientId,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
      SecretHash: secretHash, // Include SECRET_HASH here
    };

    return new Promise((resolve, reject) => {
      this.cognito.signUp(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);  // This will return the result of the signup (e.g., user confirmation status)
        }
      });
    });
  }

  async confirmSignUp(username: string, code: string) {
    const clientId = process.env.COGNITO_CLIENT_ID;
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Cognito Client ID or Client Secret is not defined');
    }

    // Calculate the SECRET_HASH
    const secretHash = this.calculateSecretHash(username, clientId, clientSecret);

    const params: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
      ClientId: clientId,
      Username: username,
      ConfirmationCode: code,
      SecretHash: secretHash,
    };

    return new Promise((resolve, reject) => {
      this.cognito.confirmSignUp(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);  // This will return the result of the confirmation
        }
      });
    });
  }

  async signIn(username: string, password: string) {
    const clientId = process.env.COGNITO_CLIENT_ID;
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;
    const userPoolId = process.env.COGNITO_USER_POOL_ID;  // Add UserPoolId from your environment variables

    if (!clientId || !clientSecret || !userPoolId) {
      throw new Error('Cognito Client ID, Client Secret, or User Pool ID is not defined');
    }

    // Calculate the SECRET_HASH
    const secretHash = this.calculateSecretHash(username, clientId, clientSecret);

    const params: AWS.CognitoIdentityServiceProvider.AdminInitiateAuthRequest = {
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      ClientId: clientId,
      UserPoolId: userPoolId,  // Include the UserPoolId here
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    };

    return new Promise((resolve, reject) => {
      this.cognito.adminInitiateAuth(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);  // This will return the result of the authentication (e.g., tokens)
        }
      });
    });
  }

  private calculateSecretHash(username: string, clientId: string, clientSecret: string): string {
    const crypto = require('crypto');
    const secretHash = crypto
      .createHmac('SHA256', clientSecret)
      .update(username + clientId)
      .digest('base64');
    return secretHash;
  }
}
