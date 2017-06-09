library(OData)

baseUrl <- "https://gegevensmagazijn.tweedekamer.nl/OData/v1/"
concept <- "Zaak"
param <- "$format=json"

elements <- list()
url <- paste(baseUrl,concept,"?",param,sep="")
             
repeat {
  tmp <- retrieveData(url)
  elements <- c(elements,tmp$value)
  nx <- tmp$odata.nextLink
  print(nx)
  if ( is.null(nx) ) {
    break
  }
  url <- paste(baseUrl,nx,"&",param,sep="")

}

# for ( i in 1:length(elements)){
#   
#   if ( ! is.null(elements[[i]]) ) {
#     print(elements[[i]]$Onderwerp)
#   }
# }

elements <- data.frame(do.call(rbind, elements))

en_patt <- "energ.*duurza|duurza.*energ"

patt_ids <- unique(c(elements[grep(en_patt,elements$Titel),"Id"],
              elements[grep(en_patt,elements$Onderwerp),"Id"]))

besluit <- list()

for ( i in 1:length(patt_ids)){
  url <- paste(baseUrl,"Zaak(guid'",patt_ids[[i]],"')/?$expand=Besluit","&",param,sep="")
  tmp <- retrieveData(url)
  if (length(tmp$Besluit) > 0){
    besluit[[length(besluit)+1]] <- tmp
  }
  
}

besluit <- data.frame(do.call(rbind,besluit))

stemming <- list()

for ( i in 1:length(besluit)){
  url <- paste(baseUrl,"Besluit(guid'",besluit$Id[i],"')/?$expand=Stemming","&",param,sep="")
  tmp <- retrieveData(url)
  break
  stemming[[length(stemming)+1]] <- tmp
  
}

indiener <- list()

for ( i in 1:length(patt_ids)){
  url <- paste(baseUrl,"Zaak(guid'",patt_ids[[i]],"')/?$expand=Indiener","&",param,sep="")
  tmp <- retrieveData(url)
  indiener[[length(indiener)+1]] <- tmp$Indiener[[1]][2]
  
}

indienerP <- list()

for ( i in 1:length(indiener)){
  url <- paste(baseUrl,"Indiener(guid'",indiener[[i]],"')/?",param,sep="")
  tmp <- retrieveData(url)
  indienerP[[length(indiener)+1]] <- tmp
  
}
