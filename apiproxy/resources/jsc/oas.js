{
    "swagger": "2.0",
    "info": {
        "description": "OpenAPI Specification for the Zoona financial service sandbox endpoints",
        "version": "1.0",
        "title": "Zoona Payment API",
        "termsOfService": "http://zoona-test.apigee.net/terms-of-service",
        "contact": {
            "name": "Cornastone API Support",
            "url": "http://www.cornastone.co.za",
            "email": "itsupport@cornastone.co.za"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": "zoona-test.apigee.net",
    "basePath": "/zap",
    "schemes": [
        "https"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "securityDefinitions": {
        "Authorization": {
            "description": "HTTP Basic encoded Merchant credentials (UUID:code). Example Basic NWVkMGE0ZDQtMDgwMS00YzAyLTllODAtOGYxODY4MTkyMzFjOjEyMzQ=",
            "type": "basic"
        }
    },
    "paths": {
        "/**": {
            "options": {
                "tags": [
                    "Support"
                ],
                "operationId": "preFlight",
                "summary": "CORS support for browsers",
                "description": "Add preflight support for Cross-Origin Resource Sharing ",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/heartbeat": {
            "get": {
                "tags": [
                    "Support"
                ],
                "operationId": "heartbeat",
                "summary": "Indicate availability",
                "description": "Return availability string (timestamp?) or 503 Try later",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/heartbeatResponse"
                        }
                    }
                }
            }
        },
        "/merchant/onboard": {
            "post": {
                "tags": [
                    "Merchants"
                ],
                "operationId": "onboardRequest",
                "summary": "Merchant signon request",
                "description": "Merchant request to Zoona to create relevant accounts to receive payment and transact from the wallet.",
                "parameters": [
                    {
                        "name": "onboardRequest",
                        "description": "JSON body payload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/onboardRequest"
                        }
                    },
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic GatewayUUID:Gateway - Merchant details do not exist yet.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw=="
                    },
                    {
                        "name": "x-api-correlation-id",
                        "description": "Merchant correlation ID",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "c61401cb-d497-4bc6-a88d-d82a1d605f76"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Created okay. Response provides MerchantUUID and MerchantCode",
                        "schema": {
                            "$ref": "#/definitions/onboardSuccess"
                        },
                        "headers": {
                            "x-api-correlation-id": {
                                "description": "correlation id of a client",
                                "type": "string"
                            }
                        }
                    },
                    "400": {
                        "description": "Failed duplicate request.",
                        "schema": {
                            "$ref": "#/definitions/onboardDuplicate"
                        }
                    },
                    "402": {
                        "description": "Failed mobile already exist.",
                        "schema": {
                            "$ref": "#/definitions/mobileExists"
                        }
                    },
                    "403": {
                        "description": "Failed user blacklisted.",
                        "schema": {
                            "$ref": "#/definitions/blacklisted"
                        }
                    },
                    "405": {
                        "description": "Failed invalid parameters.",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/invalidParam"
                            }
                        }
                    },
                    "406": {
                        "description": "Failed duplicate correlation ID.",
                        "schema": {
                            "$ref": "#/definitions/duplicateId"
                        }
                    },
                    "500": {
                        "description": "Server error.",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
        },
        "/merchant/balance": {
            "get": {
                "tags": [
                    "Merchants"
                ],
                "operationId": "balanceRequest",
                "summary": "Merchant checks balance",
                "description": "Merchant request to Zoona to check balance on own account and transact from the wallet.",
                "parameters": [
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic GatewayUUID:Gateway - Merchant details do not exist yet.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw=="
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success. Response gives statement",
                        "schema": {
                            "$ref": "#/definitions/balanceSuccess"
                        }
                    },
                    "201": {
                        "description": "Success,account suspended",
                        "schema": {
                            "$ref": "#/definitions/balanceSuspended"
                        }
                    },
                    "202": {
                        "description": "Success,balance maximum",
                        "schema": {
                            "$ref": "#/definitions/balanceMaximum"
                        }
                    },
                    "203": {
                        "description": "Success,balance minimum",
                        "schema": {
                            "$ref": "#/definitions/balanceMinimum"
                        }
                    },
                    "400": {
                        "description": "Bad request",
                        "schema": {
                            "$ref": "#/definitions/balanceMinimum"
                        }
                    },
                    "401": {
                        "description": "Bad request",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "402": {
                        "description": "Bad request",
                        "schema": {
                            "$ref": "#/definitions/accountError"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
        },
        "/merchant/transactions": {
            "get": {
                "tags": [
                    "Merchants"
                ],
                "operationId": "transactionRequest",
                "summary": "Merchant check transactions made",
                "description": "Merchant request to Zoona to check tranactions made on own account.",
                "parameters": [
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic GatewayUUID:Gateway - Merchant details do not exist yet.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw=="
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success. Response provides an array of transactions",
                        "schema": {
                            "$ref": "#/definitions/transactionSuccess"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/accountError"
                        }
                    },
                    "401": {
                        "description": "unAuthorized",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
        },
        "/payment/code": {
            "post": {
                "tags": [
                    "Payments"
                ],
                "operationId": "requestPaymentCode",
                "summary": "Merchant request for payment",
                "description": "Merchant requests a payment code from Zoona",
                "parameters": [
                    {
                        "name": "requestPaymentCode",
                        "description": "JSON body payload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/paymentCodeRequest"
                        }
                    },
                    {
                        "name": "x-api-correlation-id",
                        "description": "Merchant correlation ID",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d"
                    },
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic MerchantUUID:MerchantCode.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic NWVkMGE0ZDQtMDgwMS00YzAyLTllODAtOGYxODY4MTkyMzFjOjEyMzQ="
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/definitions/paymentCodeResponse"
                        }
                    },
                    "400": {
                        "description": "Bad request",
                        "schema": {
                            "$ref": "#/definitions/paymentCodeDuplicate"
                        }
                    },
                    "401": {
                        "description": "unAuthorized",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "402": {
                        "description": "Bad request, payment to exceed maximum",
                        "schema": {
                            "$ref": "#/definitions/accountToExceed"
                        }
                    },
                    "403": {
                        "description": "Bad request, invalid code parameters",
                        "schema": {
                            "$ref": "#/definitions/invalidCodeParams"
                        }
                    },
                    "405": {
                        "description": "Bad request, account can not transact",
                        "schema": {
                            "$ref": "#/definitions/accountCantTransact"
                        }
                    },
                    "406": {
                        "description": "Bad request, duplicate ID",
                        "schema": {
                            "$ref": "#/definitions/duplicateId"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
        },
        "/payment/code/{paymentCode}": {
            "get": {
                "tags": [
                    "Payments"
                ],
                "operationId": "queryPaymentCode",
                "summary": "Merchant queries payment Code",
                "description": "Merchant requests status of a payment code from Zoona. Code passed in URL",
                "parameters": [
                    {
                        "name": "paymentCode",
                        "description": "Payment code being queried",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "default": "12345678"
                    },
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic MerchantUUID:MerchantCode.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic NWVkMGE0ZDQtMDgwMS00YzAyLTllODAtOGYxODY4MTkyMzFjOjEyMzQ="
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK,Success",
                        "schema": {
                            "$ref": "#/definitions/paymentQueryResponse"
                        }
                    },
                    "201": {
                        "description": "Success, code expired",
                        "schema": {
                            "$ref": "#/definitions/paymentExpired"
                        }
                    },
                    "202": {
                        "description": "Success, code paid",
                        "schema": {
                            "$ref": "#/definitions/paymentPaid"
                        }
                    },
                    "203": {
                        "description": "Success, code cancelled",
                        "schema": {
                            "$ref": "#/definitions/paymentCancelled"
                        }
                    },
                    "401": {
                        "description": "unAuthorized",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/notFoundErr"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
            ,"delete": {
                "tags": [
                    "Payments"
                ],
                "operationId": "deletePaymentCode",
                "summary": "Merchant cancels a requested payment",
                "description": "Merchant wishes to revoke a payment requested from Zoona. Code passed in URL",
                "parameters": [
                    {
                        "name": "paymentCode",
                        "description": "Payment code being cancelled",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "default": "12345678"
                    },
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic MerchantUUID:MerchantCode.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic NWVkMGE0ZDQtMDgwMS00YzAyLTllODAtOGYxODY4MTkyMzFjOjEyMzQ="
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/definitions/paymentCancelResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/paymentCodeCancelError"
                        }
                    },
                    "401": {
                        "description": "unAuthorized",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/notFoundErr"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
        },
        "/merchant/notification": {
            "post": {
                "tags": [
                    "WebHooks"
                ],
                "operationId": "registerWebhook",
                "summary": "Merchant registers a webhook",
                "description": "Merchant registers a web hook endpoint for payment notifications",
                "parameters": [
                    {
                        "name": "registerWebhook",
                        "description": "JSON body payload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/registerWebhook"
                        }
                    },
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic MerchantUUID:MerchantCode.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw=="
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/definitions/registerWebhookSuccess"
                        }
                    },
                    "400": {
                        "description": "Failure, duplicate",
                        "schema": {
                            "$ref": "#/definitions/webhookExists"
                        }
                    },
                    "401": {
                        "description": "unAuthorized",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "402": {
                        "description": "Bad Request, invalid parameters",
                        "schema": {
                            "$ref": "#/definitions/webhookParamFailure"
                        }
                    },
                    "403": {
                        "description": "Bad Request, account error",
                        "schema": {
                            "$ref": "#/definitions/accountError"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
        },
        "/merchant/notification/{uuid}": {
            "get": {
                "tags": [
                    "WebHooks"
                ],
                "operationId": "listWebhooks",
                "summary": "Merchant request webhooks",
                "description": "Merchant request a list of available webhooks",
                "parameters": [
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic MerchantUUID:MerchantCode.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw=="
                    },
                    {
                        "name": "uuid",
                        "description": "Merchant UUID",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "default": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK, Success",
                        "schema": {
                            "$ref": "#/definitions/queryWebhookSuccess"
                        }
                    },
                    "201": {
                        "description": "OK, None registered",
                        "schema": {
                            "$ref": "#/definitions/noWebhooksFound"
                        }
                    },
                    "202": {
                        "description": "OK, webhook found",
                        "schema": {
                            "$ref": "#/definitions/webhookFound"
                        }
                    },
                    "401": {
                        "description": "unAuthorized",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/notFoundErr"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "WebHooks"
                ],
                "operationId": "deleteWebhook",
                "summary": "Merchant cancells a webhook",
                "description": "Merchant cancells a webhook subscription",
                "parameters": [
                    {
                        "name": "Authorization",
                        "description": "HTTP Basic MerchantUUID:MerchantCode.  Example Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw==",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "default": "Basic bWVyY2hhbnQtbmFtZTEyMzo1NTY2Nw=="
                    },
                    {
                        "name": "uuid",
                        "description": "Merchant UUID",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "default": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK, Success",
                        "schema": {
                            "$ref": "#/definitions/cancelWebhookSuccess"
                        }
                    },
                    "401": {
                        "description": "unAuthorized",
                        "schema": {
                            "$ref": "#/definitions/unAuthorized"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/notFoundErr"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/serverErr"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "heartbeatResponse": {
            "properties": {
                "heartbeatStatus": {
                    "type": "string",
                    "example": "200"
                },
                "heartbeatMessage": {
                    "type": "string",
                    "example": "System Available"
                }
            },
            "type": "object"
        },
        "onboardRequest": {
            "properties": {
                "identity-number": {
                    "type": "string",
                    "example": "999999/99/9"
                },
                "identification-type": {
                    "type": "string",
                    "example": "national-registration"
                },
                "dob": {
                    "type": "string",
                    "example": "1991-01-01"
                },
                "gender": {
                    "type": "string",
                    "example": "male"
                },
                "firstname": {
                    "type": "string",
                    "example": "Joe99"
                },
                "lastname": {
                    "type": "string",
                    "example": "Bloggs77"
                },
                "mobile": {
                    "type": "string",
                    "example": "0969999999"
                },
                "language": {
                    "type": "string",
                    "example": "bem"
                },
                "country": {
                    "type": "string",
                    "example": "ZM"
                },
                "username": {
                    "type": "string",
                    "example": "9999NOTABOT"
                },
                "password": {
                    "type": "string",
                    "example": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
                }
            },
            "type": "object"
        },
        "onboardSuccess": {
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d"
                },
                "merchant-code": {
                    "type": "string",
                    "example": "12345677"
                },
                "username": {
                    "type": "string",
                    "example": "0969999999"
                }
            },
            "type": "object"
        },
        "onboardDuplicate": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "Duplicate request"
                },
                "uuid": {
                    "type": "string",
                    "example": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d"
                },
                "merchant-code": {
                    "type": "string",
                    "example": "12345677"
                },
                "username": {
                    "type": "string",
                    "example": "0969999999"
                }
            },
            "type": "object"
        },
        "mobileExists": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "mobile number already registered, please use a new mobile number"
                },
                "invalid-parameters": {
                    "type": "string",
                    "example": "mobile-number"
                }
            },
            "type": "object"
        },
        "blacklisted": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "identity information is blacklisted and cannot be registered, please contact customer care for more information"
                },
                "invalid-parameters": {
                    "type": "object",
                    "example": {
                        "identity-number": "999999/99/9",
                        "identification-type": "NRC"
                    }
                }
            },
            "type": "object"
        },
        "invalidParam": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "invalid parameters in request, please correct and retry"
                },
                "invalid-parameters": {
                    "type": "object",
                    "example": {
                        "identity-number": "123",
                        "identification-type": "NRC",
                        "country": "af"
                    }
                }
            },
            "type": "object"
        },
        "duplicateId": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "duplicate correlation id, please retry with a new x-api-correlation-id value"
                }
            },
            "type": "object"
        },
        "serverErr": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "could not process request, please retry later or contact support and quote correlation id if applicable"
                }
            },
            "type": "object"
        },
        "balanceSuccess": {
            "properties": {
                "balance": {
                    "type": "number",
                    "example": "5800.20"
                },
                "account-status": {
                    "type": "string",
                    "example": "Active"
                },
                "minimum-balance": {
                    "type": "number",
                    "example": "50"
                },
                "maximum-balance": {
                    "type": "string",
                    "example": "10000"
                }
            },
            "type": "object"
        },
        "balanceSuspended": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "account is suspended, please contact customer care for more information"
                },
                "balance": {
                    "type": "number",
                    "example": "5800.20"
                },
                "account-status": {
                    "type": "string",
                    "example": "Suspended"
                },
                "minimum-balance": {
                    "type": "number",
                    "example": "50"
                },
                "maximum-balance": {
                    "type": "string",
                    "example": "10000"
                }
            },
            "type": "object"
        },
        "balanceMaximum": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "account has maximum allowed balance, all deposits and payment-code redemptions will be rejected until balance is reduced, please contact customer care for more information"
                },
                "balance": {
                    "type": "number",
                    "example": "10000"
                },
                "account-status": {
                    "type": "string",
                    "example": "Debit only"
                },
                "minimum-balance": {
                    "type": "number",
                    "example": "50"
                },
                "maximum-balance": {
                    "type": "string",
                    "example": "10000"
                }
            },
            "type": "object"
        },
        "balanceMinimum": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "account has minimum allowed balance, all withdrawals will be rejected until balance is increased, please contact customer care for more information"
                },
                "balance": {
                    "type": "number",
                    "example": "50.00"
                },
                "account-status": {
                    "type": "string",
                    "example": "Credit only"
                },
                "minimum-balance": {
                    "type": "number",
                    "example": "50"
                },
                "maximum-balance": {
                    "type": "string",
                    "example": "10000"
                }
            },
            "type": "object"
        },
        "accountError": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "could not retrieve account information, please contact customer care for more information"
                }
            },
            "type": "object"
        },
        "unAuthorized": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "Could not authenticate or authorize"
                }
            },
            "type": "object"
        },
        "transactionSuccess": {
            "properties": {
                "transaction1": {
                    "type": "object",
                    "example": [
                        {
                            "identification": "Payment-code redemption",
                            "credit-entry": {
                                "currency": "ZMW",
                                "amount": 95,
                                "date": "Tue Mar 06 13:46:50 GMT 2018"
                            },
                            "payment-detail": {
                                "payment-state": "paid",
                                "payment-code": "12345678",
                                "valid-until": "2018-05-01 15:00:00",
                                "amount": "100",
                                "fee": "5",
                                "reference": "INV-001"
                            },
                            "paid-by": {
                                "mobile-number": "260969888888",
                                "channel": "Zoona Plus"
                            }
                        }
                    ]
                },
                "transaction2": {
                    "type": "object",
                    "example": [
                        {
                            "identification": "Merchant Payment",
                            "correlation-id": "2d1401cb-d497-d5c6-a88d-d82a1d605ff2",
                            "credit-entry": {
                                "currency": "ZMW",
                                "amount": 44,
                                "date": "Tue Mar 06 17:01:00 GMT 2018"
                            },
                            "payment-detail": {
                                "merchant-code": "12345678",
                                "amount": 45,
                                "fee": 1
                            },
                            "paid-by": {
                                "mobile-number": "",
                                "channel": "OTC cash",
                                "reference": "joseph p"
                            }
                        }
                    ]
                }
            }
        },
        "registerWebhook": {
            "properties": {
                "endpoint": {
                    "type": "string",
                    "example": "http://my.api.example.com/payment"
                },
                "notify-on": {
                    "type": "string",
                    "example": "receive-payment"
                }
            },
            "type": "object"
        },
        "registerWebhookSuccess": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "Webhook registered"
                },
                "webhook": {
                    "type": "object",
                    "example": {
                        "uuid": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d",
                        "endpoint": "http://my.api.example.com/payment",
                        "notify-on": "receive-payment"
                    }
                }
            },
            "type": "object"
        },
        "cancelWebhookSuccess": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "Webhook deleted"
                },
                "webhook": {
                    "type": "object",
                    "example": {
                        "uuid": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d",
                        "endpoint": "http://my.api.example.com/payment",
                        "notify-on": "receive-payment"
                    }
                }
            },
            "type": "object"
        },
        "webhookExists": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "requested endpoint already registered"
                },
                "webhook": {
                    "type": "object",
                    "example": {
                        "uuid": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d",
                        "endpoint": "http://my.api.example.com/payment",
                        "notify-on": "receive-payment"
                    }
                }
            },
            "type": "object"
        },
        "webhookParamFailure": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "invalid parameters in request, please correct and retry"
                },
                "invalid-parameters": {
                    "type": "object",
                    "example": {
                        "endpoint": "notavalidaddress",
                        "notify-on": ""
                    }
                }
            },
            "type": "object"
        },
        "queryWebhookSuccess": {
            "properties": {
                "webhooks-available": {
                    "type": "string",
                    "example": [
                        {
                            "uuid": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d",
                            "endpoint": "http://my.api.example.com/payment",
                            "notify-on": "receive-payment"
                        },
                        {
                            "uuid": "9d5d8d2d-48c4-b5e0-6eef-b8b75861ce42",
                            "endpoint": "http://my.api.example.com/payment-backup",
                            "notify-on": "receive-payment"
                        }
                    ]
                }
            },
            "type": "object"
        },
        "noWebhooksFound": {
            "properties": {},
            "type": "object"
        },
        "notFoundErr": {
            "properties": {},
            "type": "object"
        },
        "webhookFound": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": {
                        "uuid": "5861ce42-6eef-48c4-b5e0-b8b79d5d8d2d",
                        "endpoint": "http://my.api.example.com/payment",
                        "notify-on": "receive-payment"
                    }
                }
            },
            "type": "object"
        },
        "paymentCodeRequest": {
            "properties": {
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "paymentCodeResponse": {
            "properties": {
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "paymentCodeDuplicate": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "Duplicate request"
                },
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "accountToExceed": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "requested payment amount will cause account to exceed maximum allowed balance, please reduce funds in account or request a lower amount"
                }
            },
            "type": "object"
        },
        "accountCantTransact": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "account is not able to transact, perform a balance request to determine account status or contact customer care for more information"
                }
            },
            "type": "object"
        },
        "invalidCodeParams": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "invalid parameters in request, please correct and retry"
                },
                "invalid-parameters": {
                    "type": "object",
                    "example": {
                        "type": "string",
                        "amount": "-5"
                    }
                }
            },
            "type": "object"
        },
        "paymentQueryResponse": {
            "properties": {
                "payment-state": {
                    "type": "string",
                    "example": "available"
                },
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "paymentExpired": {
            "properties": {
                "payment-state": {
                    "type": "string",
                    "example": "expired"
                },
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "paymentPaid": {
            "properties": {
                "payment-state": {
                    "type": "string",
                    "example": "paid"
                },
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "paymentCancelled": {
            "properties": {
                "payment-state": {
                    "type": "string",
                    "example": "cancelled"
                },
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "paymentCancelResponse": {
            "properties": {
                "payment-state": {
                    "type": "string",
                    "example": "cancelled"
                },
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        },
        "paymentCodeCancelError": {
            "properties": {
                "message": {
                    "type": "string",
                    "example": "payment-code cannot be cancelled, please check payment-state"
                },
                "payment-state": {
                    "type": "string",
                    "example": "expired"
                },
                "payment-code": {
                    "type": "string",
                    "example": "12345678"
                },
                "valid-until": {
                    "type": "string",
                    "example": "2018-05-01 15:00:00"
                },
                "amount": {
                    "type": "number",
                    "example": 100
                },
                "fee": {
                    "type": "number",
                    "example": 5
                },
                "reference": {
                    "type": "string",
                    "example": "INV-001"
                }
            },
            "type": "object"
        }
    }
} 