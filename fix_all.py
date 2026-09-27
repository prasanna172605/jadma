import re

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

# I will find all instances of 
#            ))}
#            </div>
#          </div>
#        </div>
#      </section>

pattern = r"            \}\)\}\n            </div>\n          </div>\n        </div>\n      </section>"
replacement = "            ))}\n          </div>\n        </div>\n      </section>"

c = re.sub(pattern, replacement, c)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(c)
