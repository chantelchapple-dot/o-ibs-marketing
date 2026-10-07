// Volatile, bounded keyed metadata only. No filesystem or personal payload storage.
export class MetadataStore{
 constructor(){this.submissions=new Map();this.digests=new Map();this.rates=new Map();}
 cleanup(now){for(const [id,row] of this.submissions)if(row.created<now-23*60*60*1000){this.submissions.delete(id);this.digests.delete(row.digest);}for(const [key,row] of this.rates)if(row.expires<=now)this.rates.delete(key);}
 limit(key,max,window,now){const bucket=key+':'+Math.floor(now/window);let row=this.rates.get(bucket);if((row?.count||0)>=max)return false;if(!row){if(this.rates.size>=4096)return false;row={count:0,expires:(Math.floor(now/window)+1)*window};this.rates.set(bucket,row);}row.count++;return true;}
 byId(id){return this.submissions.get(id);}
 byDigest(digest){return this.submissions.get(this.digests.get(digest));}
 insert(id,digest,now){if(this.submissions.size>=4096)throw Error('Metadata capacity reached');const row={id,digest,state:'pending',created:now};this.submissions.set(id,row);this.digests.set(digest,id);return row;}
 accepted(id){this.submissions.get(id).state='accepted';}
 close(){this.submissions.clear();this.digests.clear();this.rates.clear();}
}
