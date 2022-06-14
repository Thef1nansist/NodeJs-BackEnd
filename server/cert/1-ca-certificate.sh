#!/usr/bin/env bash

cn=CA-LAB25-SVY
ca_name=$(echo "$cn" | cut -d'-' -f3)

openssl genpkey -algorithm RSA -out "$ca_name".key
openssl req -x509 -key "$ca_name".key -days 365 -out "$ca_name".crt \
	-subj "/CN=$cn/O=$cn"
