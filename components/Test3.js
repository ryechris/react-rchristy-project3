function Item() {
  return (
    <TouchableOpacity
      onPress={}
      style={}
    ><Text></Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <SafeAreaView>
      <FlatList
        data={ARRAY}
        renderItem={FUNC}
        keyExtractor={item => item.id or some kind}
      />
    </SafeAreaView>
  )
}

return (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Item
          id={CONST.item.id}
          title={item.title}
          selected={!!selected.get(item.id)}
          onSelect={onSelect}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selected}
    />
  </SafeAreaView>
);

<SafeAreaView style={styles.container}>
  <FlatList
    data={DATA}
    renderItem={({ item }) => <Item title={item.title} />}
    keyExtractor={item => item.id}
  />
</SafeAreaView>


<SafeAreaView>
  <FlatList />
</SafeAreaView>
