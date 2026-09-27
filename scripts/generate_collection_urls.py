from pathlib import Path
import json
import sys
import urllib.parse


HERE = Path(__file__).resolve().parent
ROOT = HERE.parent

ANIMALS_FILE = HERE / "animals_short.json"
DATA_DIR = ROOT / "data"


def main():
    if len(sys.argv) != 3:
        print()
        print("USO:")
        print(
            'python .\\DONT_DEPLOY\\generate_collection_urls.py '
            'robinhood "https://opensea.io/collection/LA-COLECCION"'
        )
        print()
        raise SystemExit(1)

    blockchain = sys.argv[1].strip().lower()
    collection_url = sys.argv[2].strip().rstrip("/")

    with ANIMALS_FILE.open("r", encoding="utf-8") as f:
        animals = json.load(f)

    records = []

    for animal in animals:
        number = str(animal["number"]).zfill(3)

        traits = [
            {
                "traitType": "Collection Number",
                "values": [f"#{number}"],
            }
        ]

        encoded_traits = urllib.parse.quote(
            json.dumps(traits, separators=(",", ":")),
            safe="[]{}:,",
        )

        records.append(
            {
                "number": number,
                "name": animal["name"],
                "url": f"{collection_url}?traits={encoded_traits}",
            }
        )

    DATA_DIR.mkdir(exist_ok=True)

    output_file = DATA_DIR / f"{blockchain}_url.json"

    with output_file.open("w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)

    print()
    print(f"PASS: {len(records)} animales")
    print(f"Generado: {output_file}")
    print()
    print("Primero:")
    print(records[0])
    print()
    print("Último:")
    print(records[-1])


if __name__ == "__main__":
    main()