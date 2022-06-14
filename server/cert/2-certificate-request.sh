#!/usr/bin/env bash

cn=CA-LAB25-SVY
domain=LAB-25-FSI

openssl genpkey -algorithm RSA -out "$domain".key
openssl req -new -key "$domain".key -out "$domain".csr \
	-subj "/CN=$domain/O=$cn"
