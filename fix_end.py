with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

content = content.replace('''            ))}
          </div>
        </div>
      </section>
    </>
  );
};''', '''            ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};''')

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
