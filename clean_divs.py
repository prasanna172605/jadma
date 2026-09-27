import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Fix courses section
content = content.replace('''            ))
          </div>
        </div>
      </section>''', '''            ))}
          </div>
        </div>
      </section>''')

content = content.replace('''            ))}
            </div>
          </div>
        </div>
      </section>''', '''            ))}
          </div>
        </div>
      </section>''')

content = content.replace('''              ))}
            </div>
          </div>
        </div>
      </section>''', '''              ))}
          </div>
        </div>
      </section>''')

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
