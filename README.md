# s3-mock

Meaningless AWS S3 implementation, subproject of dynamodb-ui to be used as a layer for dynamodb-local backup-restore.  
INCOMPLETE! Probably the only supported APIs will be putObject, getObject, deleteObject.  

Uses filesystem for object storage and LevelDB as database.  
Why not dynamodb-local ? because dynamodb-local enjoys RAM and I want this to run inside a itty bitty docker.  


```
S3_STORAGE_PATH=$PWD/storage node src/index.js
```

## @todo

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
