import csv;
import json;

data = [];

with open("rewards.csv", "r") as file:
    csvreader = csv.reader(file)

    header = next(csvreader);

    for row in csvreader:
        record = {};

        for i in range(len(header)):
            value = row[i].strip() if row[i] != "" else "---";
            record[header[i].strip()] = value;

        data.append(record)

with open("rewards.js", 'w') as jsfile:
    jsfile.write("const data = ")
    json.dump(data, jsfile, indent=4)
