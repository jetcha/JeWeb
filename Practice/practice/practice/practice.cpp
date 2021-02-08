#include <iostream>
#include <string>
#include <cctype>

std::string to_camel_case(std::string text) {
	for (auto itr = text.begin(); itr != text.end(); itr++)
	{
		if (*itr == '_' || *itr == '-')
		{
			// std::toupper(*itr);
			*(itr + 1) = std::toupper(*(itr + 1));
			// std::cout << '0' + std::toupper(*(itr+1)) << std::endl;
			text.erase(itr);
			itr--;
		}
	}
	return text;
}

int main()
{
	std::cout << to_camel_case("the_stealth_warrior") << std::endl;
}

