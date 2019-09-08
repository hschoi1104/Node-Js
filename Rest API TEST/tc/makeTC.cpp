#include <iostream>
#include <ctime>
using namespace std;
typedef long long ll;
int main() {
	ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
	ll n, q, kk; cin >> n >> q >> kk;
	srand(time(NULL));
	for (int i = 0; i < n; i++) {
		ll p, k, c;
		p = rand() % 1000001;
		k = rand() % kk + 100000;
		c = rand() % 1000000 + 1;
		cout << p << " " << k << " " << c << "\n";
	}
	return 0;
}