# s3-mock

Meaningless AWS S3 implementation, subproject of dynamodb-ui to be used as a layer for dynamodb-local backup-restore.  
INCOMPLETE! Probably the only supported APIs will be putObject, getObject, deleteObject.  

Uses filesystem for object storage and LevelDB as database.  
Why not dynamodb-local ? because dynamodb-local enjoys RAM and I want this to run inside a itty bitty docker.  


```
S3_STORAGE_PATH=$PWD/storage node src/index.js
```

## @todo

###### Buckets

- [ ] createBucket
-  - [x] LocationConstraint
-  - [ ] ACL: private | public-read | public-read-write | authenticated-read,
-  - [ ] GrantFullControl
-  - [ ] GrantRead
-  - [ ] GrantReadACP
-  - [ ] GrantWrite
-  - [ ] GrantWriteACP
-  - [ ] ObjectLockEnabledForBucket
- [x] listBuckets

- [x] deleteBucket

####### Objects

- [ ] putObject
-  - [ ] ACL: private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control
-  - [ ] CacheControl
-  - [ ] ContentDisposition
-  - [ ] ContentEncoding
-  - [ ] ContentLanguage
-  - [ ] ContentLength
-  - [ ] ContentMD5
-  - [ ] ContentType
-  - [ ] Expires
-  - [ ] GrantFullControl
-  - [ ] GrantRead
-  - [ ] GrantReadACP
-  - [ ] GrantWriteACP
-  - [ ] Metadata
-  - [ ] ObjectLockLegalHoldStatus: ON | OFF
-  - [ ] ObjectLockMode: GOVERNANCE | COMPLIANCE
-  - [ ] ObjectLockRetainUntilDate
-  - [ ] RequestPayer
-  - [ ] SSECustomerAlgorithm
-  - [ ] SSECustomerKey
-  - [ ] SSECustomerKeyMD5
-  - [ ] SSEKMSEncryptionContext
-  - [ ] SSEKMSKeyId
-  - [ ] ServerSideEncryption: AES256 | aws:kms
-  - [ ] StorageClass: STANDARD | REDUCED_REDUNDANCY | STANDARD_IA | ONEZONE_IA | INTELLIGENT_TIERING | GLACIER | DEEP_ARCHIVE
-  - [ ] Tagging
-  - [ ] WebsiteRedirectLocation

- [ ] getObject
-  - [ ] IfMatch
-  - [ ] IfModifiedSince
-  - [ ] IfNoneMatch
-  - [ ] IfUnmodifiedSince
-  - [ ] PartNumber
-  - [ ] Range
-  - [ ] RequestPayer
-  - [ ] ResponseCacheControl
-  - [ ] ResponseContentDisposition
-  - [ ] ResponseContentEncoding
-  - [ ] ResponseContentLanguage
-  - [ ] ResponseContentType
-  - [ ] ResponseExpires
-  - [ ] SSECustomerAlgorithm
-  - [ ] SSECustomerKey
-  - [ ] SSECustomerKeyMD5
-  - [ ] VersionId

- [ ] deleteObject
-  - [ ] BypassGovernanceRetention
-  - [ ] MFA
-  - [ ] RequestPayer
-  - [ ] VersionId

- [ ] listObjects
-  - [ ] Delimiter
-  - [ ] EncodingType
-  - [ ] Marker
-  - [ ] MaxKeys
-  - [ ] Prefix
-  - [ ] RequestPayer
