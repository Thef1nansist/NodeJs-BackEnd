#!/usr/bin/env bash

cn=CA-LAB25-SVY
ca_name=$(echo "$cn" | cut -d'-' -f3)
domain=LAB-25-FSI
altdomain=$(echo "$domain" | cut -d'-' -f3)

openssl x509 -req -in "$domain".csr -days 365 -out "$domain".crt \
	-CA "$ca_name".crt -CAkey "$ca_name".key -CAcreateserial \
	-extfile <(
		cat <<END
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
subjectAltName = @alt_names

[ alt_names ]

DNS.1 = $domain
DNS.2 = $altdomain
END
	)
