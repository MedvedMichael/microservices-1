path "sys/health"
{
  capabilities = ["read", "sudo"]
}

path "sys/policies/acl"
{
  capabilities = ["list"]
}

path "sys/policies/acl/superuser"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

path "auth/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

path "sys/auth/*"
{
  capabilities = ["create", "update", "delete", "sudo"]
}

path "sys/auth"
{
  capabilities = ["read"]
}

path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

path "sys/mounts"
{
  capabilities = ["read"]
}