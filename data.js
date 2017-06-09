const data = [
  "groningen;0,752833617;40,05347723;0,107;172,1",
  "friesland;0,646371825;26,37454737;0,085;28,2",
  "drenthe;0,58925064;28,73545912;0,07;30",
  "overijssel;0,66742383;24,76728742;0,073;87,8",
  "flevoland;1,580209621;24,61688103;0,221;320,1",
  "gelderland;0,534078703;27,66748807;0,052;58,6",
  "utrecht;0,564708866;21,82241196;0,027;20,9",
  "noordholland;0,591287467;24,48662941;0,052;107,6",
  "zuidholland;0,429200842;33,82986197;0,036;127",
  "zeeland;0,234620711;99,80574353;0,03;27,2",
  "noordbrabant;0,57711227;30,83309448;0,068;212,2",
  "limburg;0,372574026;40,18253432;0,029;54,8"
].reduce(function(result, item) {
  const columns = item.split(';')
  const key = columns[0]
  result[key] = parseFloat(columns[1].replace(',', '.') * 100)
  return result
}, {})
