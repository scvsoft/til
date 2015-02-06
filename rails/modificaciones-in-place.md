**No hacer modificaciones in place de atributos de modelos de `ActiveRecord`**

```rb
model.value # 'old value'
model.value.gsub!('old', 'new')
model.save

model.value # 'old value'
```

Rails no se da cuenta cuando se modifican atributos in place. Hay que hacer una asignación explícita:

```rb
model.value # 'old value'
model.value = model.value.gsub('old', 'new')
model.save

model.value = 'new value'
```

https://github.com/rails/rails/issues/2665
